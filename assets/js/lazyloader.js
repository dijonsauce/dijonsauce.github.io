// Facade
// Fake loading icon on video/widget for lazy third party loading from 
// https://wildbit.com/blog/getting-postmark-lighthouse-performance-score-to-100#:~:text=What%20if%20we%20could%20replace%20the%20real%20widget.

var FakeBeacon = {
    init: function() {
      document.querySelector('.js-beacon').addEventListener('click', function() {
        FakeBeacon.load(this);
      });
    },
  
    load: function(el) {
      // Trigger beacon loading.
      FakeBeacon.loadScript();
  
      // Indicate that it's loading.
      el.classList.add('is-loading');
  
      // Once loaded, hide the fake beacon and open the real one.
      window.Beacon('once', 'ready', function() {
        el.remove();
        window.Beacon('open');
        Cookies.set('hs-beacon', 'open', { expires: 1 });
      });
  
      // Once real beacon is closed, revert to the normal behavior.
      window.Beacon('on', 'close', function() {
        Cookies.remove('hs-beacon');
      });
    },
  
    loadScript: function() {

    }
  }