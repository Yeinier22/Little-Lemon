export function parse(hhmm){
  // hh:mm
  const [h,m] = hhmm.split(':').map(Number);
  const d = new Date(2000,0,1,h,m,0,0);
  return d;
}
export function format(date, fmt){
  const pad = n => n.toString().padStart(2,'0');
  if(fmt==='HH:mm') return pad(date.getHours())+':'+pad(date.getMinutes());
  if(fmt==='h:mm a'){
    let h = date.getHours();
    const m = pad(date.getMinutes());
    const ampm = h>=12?'PM':'AM';
    h = h%12 || 12;
    return `${h}:${m} ${ampm}`;
  }
  throw new Error('Unsupported format');
}
export function addMinutes(date, mins){
  const d = new Date(date.getTime());
  d.setMinutes(d.getMinutes()+mins);
  return d;
}
export function isBefore(a,b){ return a.getTime()<b.getTime(); }
export function isAfter(a,b){ return a.getTime()>b.getTime(); }
