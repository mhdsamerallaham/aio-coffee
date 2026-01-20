// Developer Tools detection and protection
export const detectDevTools = () => {
  let devtools = { open: false, orientation: null };
  const threshold = 160;
  
  const check = () => {
    const widthThreshold = window.outerHeight - window.innerHeight > threshold;
    const heightThreshold = window.outerWidth - window.innerWidth > threshold;
    
    if (!(heightThreshold && widthThreshold) && 
        ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || 
         widthThreshold || heightThreshold)) {
      if (!devtools.open) {
        devtools.open = true;
        devtools.orientation = widthThreshold ? 'vertical' : 'horizontal';
        return true;
      }
    } else {
      devtools.open = false;
      devtools.orientation = null;
    }
    return false;
  };
  
  return { check, devtools };
};

export const protectContent = () => {
  const { check } = detectDevTools();
  
  const interval = setInterval(() => {
    if (check()) {
      // Developer tools açıldığında yapılacaklar
      console.clear();
      console.log('%c🚫 Developer Tools Detected!', 'color: red; font-size: 20px; font-weight: bold;');
      console.log('%cBu site kaynak kodlarını koruma altındadır.', 'color: orange; font-size: 14px;');
      
      // İsteğe bağlı: Sayfayı karart veya yönlendir
      // document.body.style.filter = 'blur(10px)';
      // window.location.href = 'about:blank';
    }
  }, 1000);
  
  return () => clearInterval(interval);
};

// Sağ tık engelleme
export const disableRightClick = (e) => {
  e.preventDefault();
  return false;
};

// Metin seçim engelleme
export const disableTextSelection = (e) => {
  if (e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
      (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
    e.preventDefault();
    return false;
  }
};
