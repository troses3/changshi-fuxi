// Advanced Multi-Tier Web Haptic Engine (iOS 17.4+ Switch Hack & Android/Standard Vibration API)

let hapticSwitch = null;
let hapticLabel = null;

function getHapticElements() {
  if (typeof document === 'undefined') return { hapticSwitch: null, hapticLabel: null };
  if (!hapticSwitch) {
    hapticSwitch = document.getElementById('ios-haptic-trigger-switch');
    hapticLabel = document.getElementById('ios-haptic-trigger-label');

    if (!hapticSwitch) {
      hapticSwitch = document.createElement('input');
      hapticSwitch.type = 'checkbox';
      hapticSwitch.setAttribute('switch', '');
      hapticSwitch.id = 'ios-haptic-trigger-switch';
      hapticSwitch.style.position = 'fixed';
      hapticSwitch.style.opacity = '0';
      hapticSwitch.style.pointerEvents = 'none';
      hapticSwitch.style.top = '-9999px';
      hapticSwitch.style.left = '-9999px';
      hapticSwitch.setAttribute('aria-hidden', 'true');
      document.body.appendChild(hapticSwitch);
    }

    if (!hapticLabel) {
      hapticLabel = document.createElement('label');
      hapticLabel.htmlFor = 'ios-haptic-trigger-switch';
      hapticLabel.id = 'ios-haptic-trigger-label';
      hapticLabel.style.position = 'fixed';
      hapticLabel.style.opacity = '0';
      hapticLabel.style.pointerEvents = 'none';
      hapticLabel.style.top = '-9999px';
      hapticLabel.style.left = '-9999px';
      hapticLabel.setAttribute('aria-hidden', 'true');
      document.body.appendChild(hapticLabel);
    }
  }
  return { hapticSwitch, hapticLabel };
}

// iOS Taptic click via simulated switch toggle
function iosClick() {
  try {
    const { hapticLabel } = getHapticElements();
    if (hapticLabel) {
      hapticLabel.click();
    }
  } catch (e) {}
}

/**
 * Trigger full-spectrum haptic feedback tailored for both iOS (switch rhythm) and Android (vibrate patterns)
 * @param {'tap' | 'menuToggle' | 'optionSelect' | 'dangerReset' | 'cardFlip' | 'success' | 'error' | 'clear' | 'combo' | 'celebration'} type
 */
export function triggerHaptic(type = 'tap') {
  // -------------------------------------------------------------
  // 1. Android & Standards-compliant navigator.vibrate patterns
  // -------------------------------------------------------------
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      switch (type) {
        case 'tap':
          navigator.vibrate(12);
          break;
        case 'optionSelect':
          navigator.vibrate(18);
          break;
        case 'menuToggle':
          navigator.vibrate([15, 45, 15]);
          break;
        case 'cardFlip':
          navigator.vibrate(25);
          break;
        case 'clear':
          navigator.vibrate([15, 30, 15]);
          break;
        case 'success':
          navigator.vibrate([20, 50, 30]);
          break;
        case 'error':
          navigator.vibrate([40, 45, 40, 45, 40]);
          break;
        case 'dangerReset':
          navigator.vibrate([60, 120, 80]);
          break;
        case 'combo':
          navigator.vibrate([25, 40, 25, 40, 35]);
          break;
        case 'celebration':
          navigator.vibrate([30, 60, 30, 60, 50, 80, 70]);
          break;
        default:
          navigator.vibrate(15);
      }
    } catch (e) {}
  }

  // -------------------------------------------------------------
  // 2. iOS 17.4+ WebKit Switch Hack with Rhythmic Time-Sequence
  // -------------------------------------------------------------
  try {
    switch (type) {
      case 'tap':
      case 'optionSelect':
        iosClick();
        break;

      case 'menuToggle':
        // Double pop for menu open/close
        iosClick();
        setTimeout(iosClick, 45);
        break;

      case 'cardFlip':
        iosClick();
        break;

      case 'clear':
        // Snappy double click
        iosClick();
        setTimeout(iosClick, 40);
        break;

      case 'success':
        // Crisp affirmative double tap (哒-哒)
        iosClick();
        setTimeout(iosClick, 65);
        break;

      case 'error':
        // Rapid triple warning jitter (哒哒哒)
        iosClick();
        setTimeout(iosClick, 45);
        setTimeout(iosClick, 95);
        break;

      case 'dangerReset':
        // Heavy warning double impulse with strong interval (咚……咚)
        iosClick();
        setTimeout(iosClick, 130);
        break;

      case 'combo':
        // Escalating rhythm
        iosClick();
        setTimeout(iosClick, 50);
        setTimeout(iosClick, 110);
        break;

      case 'celebration':
        // Triumphant 4-burst rhythm
        iosClick();
        setTimeout(iosClick, 70);
        setTimeout(iosClick, 140);
        setTimeout(iosClick, 220);
        break;

      default:
        iosClick();
    }
  } catch (e) {}
}

export default triggerHaptic;
