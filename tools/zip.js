// Small ZIP writer for generated text files. ZIP32, UTF-8 names, no dependencies.
const encoder = new TextEncoder();
const crcTable = Uint32Array.from({length:256}, (_, n) => {
  let value = n;
  for (let i=0; i<8; i++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
export function zipTextFiles(files) {
  const parts = [], directory = [];
  let offset = 0, directorySize = 0;
  if (files.size > 65535) throw new Error('Too many files for a ZIP32 archive.');
  for (const [filename, text] of files) {
    if (filename.startsWith('/') || filename.split('/').includes('..')) throw new Error('Unsafe filename.');
    const name = encoder.encode(filename), bytes = encoder.encode(text), crc = crc32(bytes);
    const local = new Uint8Array(30), lv = new DataView(local.buffer);
    lv.setUint32(0,0x04034b50,true); lv.setUint16(4,20,true); lv.setUint16(6,0x0800,true); lv.setUint16(12,33,true);
    lv.setUint32(14,crc,true); lv.setUint32(18,bytes.length,true); lv.setUint32(22,bytes.length,true); lv.setUint16(26,name.length,true);
    parts.push(local,name,bytes);
    const central = new Uint8Array(46), cv = new DataView(central.buffer);
    cv.setUint32(0,0x02014b50,true); cv.setUint16(4,20,true); cv.setUint16(6,20,true); cv.setUint16(8,0x0800,true); cv.setUint16(14,33,true);
    cv.setUint32(16,crc,true); cv.setUint32(20,bytes.length,true); cv.setUint32(24,bytes.length,true); cv.setUint16(28,name.length,true); cv.setUint32(42,offset,true);
    directory.push(central,name);
    directorySize += central.length + name.length;
    offset += local.length + name.length + bytes.length;
    if (offset + directorySize > 0xffffffff) throw new Error('Archive exceeds ZIP32 size limits.');
  }
  const end = new Uint8Array(22), ev = new DataView(end.buffer);
  ev.setUint32(0,0x06054b50,true); ev.setUint16(8,files.size,true); ev.setUint16(10,files.size,true);
  ev.setUint32(12,directorySize,true); ev.setUint32(16,offset,true);
  return new Blob([...parts,...directory,end], {type:'application/zip'});
}
