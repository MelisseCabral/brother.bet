window.globalSeconds = 0;
window.initTime = 0;

const debugTime = (msg) => {
  if (window.developerMode) {
    const d = new Date();
    const seconds = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    if (window.globalSeconds === 0) window.initTime = seconds;
    console.log(seconds - window.globalSeconds, seconds - window.initTime, msg);
    window.globalSeconds = seconds;
  }
};

export default debugTime;
