var STUN = {
	url: 'stun:stun.l.google.com:19302'
};

VideoCall = {
	socket: io('https://webrtc-meetup-io.herokuapp.com'),

  showRemotePeer: function () {
    $('.video-wrap').addClass('twoVideo');
  },

  requestMediaStream: function() {
    
  },

  startCall: function () { },
}

var call = document.getElementById('call');
call.onclick = VideoCall.startCall;

VideoCall.requestMediaStream();