import { useEffect } from 'react';
export const useScroll = () => {
  //function to get the current scroll position
  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos && prevScrollpos) {
        document.getElementById('navbar').style.top = '0';
      } else {
        document.getElementById('navbar').style.top = '-80px';
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);
};
