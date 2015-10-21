var wrapper,
    clearButton ,
    saveButton,
    canvas,
    signaturePad;

Template.helperSigpad.rendered = function() {
  wrapper = document.getElementById("signature-pad");
  canvas = wrapper.querySelector("canvas");

  // Adjust canvas coordinate space taking into account pixel ratio,
  // to make it look crisp on mobile devices.
  // This also causes canvas to be cleared.
  function resizeCanvas() {
  canvas.style.width='100%';
  canvas.style.height='50%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight - 25;
  }

  window.onresize = resizeCanvas;
  resizeCanvas();

  signaturePad = new SignaturePad(canvas);
};

Template.helperSigpad.events({
  "click [data-action=clear]": function() {
    signaturePad.clear();
  },
  "click [data-action=save]": function() {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        //window.open(signaturePad.toDataURL());
		Router.go('helper.release', {_id: Router.current().params._id.replace('id=','')});
    }
  },
});