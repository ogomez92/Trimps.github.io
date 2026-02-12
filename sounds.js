// Sound Manager for Trimps
// Sounds are loaded from the sounds/ directory (bundled with the app).
// Usage:
//   SoundManager.play('click');       // plays sounds/click.mp3
//   SoundManager.setVolume(0.5);      // 0.0 to 1.0
//   SoundManager.setMuted(true);      // mute all sounds
//
// To add sounds, place .mp3 files in the sounds/ directory.

var SoundManager = (function () {
	var volume = 0.5;
	var muted = false;
	var cache = {};

	function getAudio(name) {
		if (!cache[name]) {
			var audio = new Audio('sounds/' + name + '.mp3');
			audio.volume = volume;
			cache[name] = audio;
		}
		return cache[name];
	}

	function play(name) {
		if (muted) return;
		try {
			var audio = getAudio(name);
			audio.volume = volume;
			audio.currentTime = 0;
			audio.play();
		} catch (e) {
			// Sound not found or playback error — fail silently
		}
	}

	function setVolume(v) {
		volume = Math.max(0, Math.min(1, v));
		for (var key in cache) {
			cache[key].volume = volume;
		}
	}

	function getVolume() {
		return volume;
	}

	function setMuted(m) {
		muted = !!m;
	}

	function isMuted() {
		return muted;
	}

	function preload(names) {
		for (var i = 0; i < names.length; i++) {
			getAudio(names[i]);
		}
	}

	return {
		play: play,
		setVolume: setVolume,
		getVolume: getVolume,
		setMuted: setMuted,
		isMuted: isMuted,
		preload: preload
	};
})();
