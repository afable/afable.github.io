(function( afable, undefined ){

  'use strict';

  // debugging toggle
  let de = false;
  let bug = console;

  // constants
  let KEYS = { SPACE : 32 }, STATES = { INTRO : 0, TALK : 1, WALK : 2 };

  // globals
  let game, t, dt, newTime, frameTime, currTime, accumulator;
  let talker, convos;
  let keyboard, keysDown;
  let canvas, ctx;
  let box, i, img, p;
  let walkerImg, walker;
  let miniImg, mini;
  let backgroundImg, background;
  let buildings;
  let starsImg, stars, stars2;
  let restart;



  /**
   * init
   */
  (function init() {

    game = { state: STATES.TALK, stopGameLoop: 0, pauseTime: 0, locked: false,
      lock: function() { game.locked = true; },
      unlock: function() { game.locked = false; },
      isLocked: function() { return game.locked; },
      music: new Audio( './audio/8bit.mp3' )
    };
    t = 0, dt = 1/240, currTime = performance.now(), accumulator = 0;
    if ( de&&bug ) game.state = STATES.WALK;
    talker = { lastTime: 0, delay: 1 };
    convos = { curr: '', count: 0, dialogCount: 0, dialog: [
      { text: '( Press SPACEBAR )',
        img: './img/face.png' },
      { text: 'Hello. I am CAT.',
        img: './img/face.png' },
      { text: 'I come from the Neowineteen-Eighties.',
        img: './img/face.png' },
      { text: 'Will hooomans helps Cat back to the "Eighties"?',
        img: './img/face.png' },
      { text: undefined, img: './img/face.png' }
    ], wait: false, audio: new Audio( './audio/typewriter.mp3') };
    convos.isDone = function() {
      if ( convos.dialog[ convos.dialogCount ].text === undefined ) {
        return true;
      }
      return false;
    }
    box = document.getElementById( 'talkie-box' );
    i = document.getElementsByTagName( 'i' )[0];
    img = document.getElementById( 'talkie-img' );
    p = document.getElementById( 'talkie' );
    restart = document.getElementById( 'restart' );

    // init handle keyboard input
    keyboard = {

      keys : {},
      keyPress : function( e ) {
        if ( this.keys[e.keyCode] > 0 ) { return; }
        this.keys[e.keyCode] = e.timeStamp || ( performance.now() );
        e.stopPropagation();
      },

      keyRelease: function( e ) {
        this.keys[e.keyCode] = 0;
        e.stopPropagation();
      }

    };
    keysDown = {};

    // add keyboard event listeners and bind 'this' to keyboard
    window.addEventListener( 'keydown', keyboard.keyPress.bind( keyboard ), false );
    window.addEventListener( 'keyup', keyboard.keyRelease.bind( keyboard ), false );

    // setup canvas height & width to viewport screen and on resize
    canvas = document.getElementsByTagName( 'canvas' )[0];
    ctx = canvas.getContext( '2d' );
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    window.addEventListener( 'resize', onWindowResize, false );

    // setup walker sprite
    walkerImg = new Image();
    walkerImg.src = './img/walk-jump-colour.png';
    walker = Sprite( {
      ctx: ctx,
      height: 600,
      img: walkerImg,
      numberOfFrames: 2,
      numberOfVFrames: 2,
      ticksPerFrame: 16,
      vFrameIndex: 0,
      width: 400,
      x: 0,
      y: 0
    } );
    // set walker in the middle of screen
    walker.center();


    // create a mini walker we can jump over
    miniImg = new Image();
    miniImg.src = './img/walk-jump-mini.png';
    mini = Sprite( {
      ctx: ctx,
      height: 600,
      img: miniImg,
      numberOfFrames: 2,
      numberOfVFrames: 2,
      ticksPerFrame: 16,
      vFrameIndex: 0,
      width: 400,
      x: window.innerWidth - 100,
      y: window.innerHeight - 150,
      scaleWidth: 0.5,
      scaleHeight: 0.5 
    } );


    // create background 
    backgroundImg = new Image();
    backgroundImg.src = './img/background.png';
    background = Sprite( {
      ctx: ctx,
      height: 800,
      img: backgroundImg,
      ticksPerFrame: 9999,
      width: 600,
      x: 0,
      y: 0,
      scaleWidth: 2.5,
      scaleHeight: 1.3,
    } );

    // create buildings
    buildings = [];
    let numBuildings = 7;
    let b;
    for ( b = 0; b < numBuildings; ++b ) {
      buildings.push( {} );
      buildings[b].img = new Image();
      buildings[b].img.src = './img/building-' + b + '.png';
      buildings[b].sprite = Sprite( {
        ctx: ctx,
        height: 800,
        img: buildings[b].img,
        ticksPerFrame: 9999,
        width: 600,
        x: (300 + Math.random() * 100 ) * b,
        y: 80 + Math.random() * 20,
        scaleWidth: 1,
        scaleHeight: 1,
      } );
    }

    // create stars
    starsImg = new Image();
    starsImg.src = './img/stars.png';
    stars = Sprite( {
      ctx: ctx,
      height: 800,
      img: starsImg,
      ticksPerFrame: 9999,
      width: 600,
      x: 0,
      y: 0,
      scaleWidth: 3,
      scaleHeight: 2,
    } );
    stars2 = Sprite( {
      ctx: ctx,
      height: 800,
      img: starsImg,
      ticksPerFrame: 9999,
      width: 600,
      x: 1400,
      y: 100,
      scaleWidth: 3,
      scaleHeight: 2,
    } );

    // start a rAF for gameloop
    requestAnimationFrame( gameloop );

  }());



  /**
   * game loop
   */
  function gameloop() {

    game.stopGameLoop = requestAnimationFrame( gameloop );

    newTime = performance.now();
    frameTime = newTime - currTime;
    frameTime *= 0.001; //need frame time in seconds
    currTime = newTime;

    accumulator += frameTime;

    if ( game.pauseTime > 0 ) {
      game.pauseTime -= accumulator;
      return;
    }

    while ( accumulator >= dt ) {

      // handle inputs, physics, and draw
      if ( !game.isLocked() ) {
        handleInputs( game.state, t, dt );
      }
      updatePhysics( game.state, t, dt );

      accumulator -= dt;
      t += dt;

    }

    draw( game.state, t, frameTime );

    // swap between TALK and WALK states
    if ( !de&&bug ) game.state = ( convos.isDone() )? STATES.WALK : STATES.TALK;

  }



  /**
   * handle inputs
   */
  function handleInputs( state, t, dt ) {

    if ( keyboard.keys[KEYS.SPACE] )  {
      de&&bug.log( 'space downnnnn' );

      // only fire once on each keydown (undefined or 0)
      if ( !keysDown[KEYS.SPACE] ) {

        if ( state === STATES.INTRO ) {
          de&&bug.log( 'SPACE pressed during intro!' );
        }

        if ( state === STATES.TALK ) {
          // convo waiting on input... to proceed
          if ( convos.wait ) {
            convos.wait = !convos.wait;
            i.classList.toggle( 'blink' );

            // increment if not very last dialog
            de&&bug.log( convos.dialog[convos.dialogCount] );
            if ( !convos.isDone() ) {
              convos.dialogCount++;
            }

          } else {
          // otherwise convo still talking... rush it
            convos.count = convos.curr.length-1;
          }

        }

        if ( state === STATES.WALK ) {

          // walk or jump!
          if ( walker.isWalking() ) {
            walker.jump();
          } else {
            walker.walk();
          }

        }

      }

    }

    // keep track of key presses for fire once per keypress
    keysDown[KEYS.SPACE] = keyboard.keys[KEYS.SPACE];

  }



  /**
   * update physics
   */
  function updatePhysics( state, t, dt ) {
  }



  /**
   * draw
   */
  function draw( state, t, frameTime ) {

    if ( state === STATES.TALK ) {
      bantr( { delay : 0.1,
               text : convos.dialog[convos.dialogCount].text
      });
    }

    if ( state === STATES.WALK ) {
      // hide bantr
      if ( img.style.opacity === '1' ) {
        img.classList.add( 'fade-out' );
      }
      if ( box.style.opacity === '1' ) {
        box.classList.add( 'fade-out' );
      }
      if ( restart.style.opacity == '0' ) {
        restart.classList.add( 'fade-in' );
      }

      // start playing music if not already playing
      if ( !game.music.loop ) {
        game.music.play();
        game.music.loop = true;
      }

      // draw background
      background.update();
      background.render();

      // draw stars
      stars.update();
      stars.render();
      stars.x -= 2;
      if ( stars.x <= -1600 ) {
        stars.x = 1400;
      }
      stars2.update();
      stars2.render();
      stars2.x -= 2;
      if ( stars2.x <= -1600 ) {
        stars2.x = 1400;
      }


      // draw buildings 
      let b;
      for ( b = 0; b < buildings.length; ++b ) {
        buildings[b].sprite.update();
        // move buildings left
        buildings[b].sprite.x -= 3;
        if ( buildings[b].sprite.x <= -600 ) {
          buildings[b].sprite.x = window.innerWidth * 1.5;
        }
        buildings[b].sprite.render();
      }

      // draw walking character
      walker.update();
      walker.render();


      // update mini
      mini.update();
      // clear previous render
      ctx.globalAlpha = 0;
      ctx.fillRect(
        mini.x,
        mini.y,
        ( mini.width / mini.frames ) * mini.scaleWidth,
        ( mini.height / mini.vFrames ) * mini.scaleHeight
      );
      ctx.globalAlpha = 1.0;
      // move mini left
      mini.x -= 4;
      if ( mini.x <= -100) {
        mini.x = window.innerWidth;
      }
      // newest render
      mini.render();

    }

  }



  /**
   * retain canvas full screen to viewport on resize
   */
  function onWindowResize() {

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    draw( game.state, t, frameTime );

    walker.center();
  }



  function bantr( ops ) {

    let delay = ( ops.delay )? ops.delay : talker.delay;
    let text = ( ops.text )? ops.text : '';

    // wait for input to proceed to next convo
    if ( convos.wait ) { return; }

    // setup new conversation
    if ( convos.count === 0 ) {
      convos.curr = text;
      img.src = convos.dialog[convos.dialogCount].img;

      game.pauseTime += 10;
    }

    // print out each letter of current TALK
    if ( talker.lastTime + delay < t ) {

      // increment letter
      convos.count++;
      p.firstChild.textContent = convos.curr.substr( 0, convos.count );

      // play audio while printing
      convos.audio.play();

      talker.lastTime = t;
    }

    // close off finished conversations and wait for input
    if ( convos.count === convos.curr.length ) {
      convos.count = 0;
      convos.wait = true;
      i.classList.toggle( 'blink' );

    }

  }

  function Sprite( ops ) {

    let obj = {};
    obj.ctx = ops.ctx || ctx;
    obj.height = ops.height;
    obj.img = ops.img;
    obj.loop = true;
    obj.width = ops.width;
    obj.x = ops.x || 0;
    obj.y = ops.y || 0;
    obj.scaleWidth = ops.scaleWidth || 1;
    obj.scaleHeight = ops.scaleHeight || 1;

    obj.jumpAmount = 0;
    obj.jumpAmountMax= 150;
    obj.jumpSpeed = 10;
    obj.isLanding = false;

    obj.frameIndex = 0;
    obj.vFrameIndex = ops.vFrameIndex || 0;
    obj.frames = ops.numberOfFrames || 1;
    obj.vFrames = ops.numberOfVFrames || 1;
    obj.tickCount = 0;
    obj.ticksPerFrame = ops.ticksPerFrame || 0;

    obj.update = function() {

      obj.tickCount += 1;

      // update sprite frame based on ticksPerFrame
      if ( obj.tickCount > obj.ticksPerFrame ) {

        // reset tick count
        obj.tickCount = 0;

        // if current frame index out of range
        if ( obj.frameIndex < obj.frames - 1 ) {

          // go to next frame
          obj.frameIndex += 1;

        } else {

          // else reset to first frame if we are looping
          if ( obj.loop ) {
            obj.frameIndex = 0;
          }

        }

      }

      // are we jumping? 
      if ( obj.isJumping() ) {

        // have we started yet? ie, not landing
        if ( !obj.isLanding ) {

          // jump until we reach the max height!
          obj.jumpAmount += obj.jumpSpeed;

          if ( obj.jumpAmount >= obj.jumpAmountMax ) {

            obj.jumpAmount = obj.jumpAmountMax;
            obj.isLanding = true;

          }

        } else {

          // land until we reach the ground!
          obj.jumpAmount -= obj.jumpSpeed;

          if ( obj.jumpAmount <= 0 ) {

            obj.jumpAmount = 0;
            obj.isLanding = false;

            // we've landed, now start walking again!
            obj.walk();

          }

        }



        // are we landing?

      }

    };

    obj.render = function() {
      // clear previous render using a fill rect alpha
      ctx.globalAlpha = 0;
      ctx.fillRect(
        obj.x,
        obj.y - obj.jumpAmount,
        ( obj.width / obj.frames ) * obj.scaleWidth,
        ( obj.height / obj.vFrames ) * obj.scaleHeight
      );
      ctx.globalAlpha = 1.0;

      // render obj
      obj.ctx.drawImage(
        obj.img,
        obj.frameIndex * obj.width / obj.frames,
        obj.vFrameIndex * obj.height / obj.vFrames,
        obj.width / obj.frames,
        obj.height / obj.vFrames,
        obj.x,
        obj.y - obj.jumpAmount,
        ( obj.width / obj.frames ) * obj.scaleWidth,
        ( obj.height / obj.vFrames ) * obj.scaleHeight
      );
    };

    obj.center = function() {
      // center walker in the middle of screen
      obj.x = ( window.innerWidth - obj.width/obj.frames ) / 2;
      obj.y = ( ( window.innerHeight - obj.height/obj.vFrames ) / 2 ) + 200;
    };

    obj.walk = function() {
      // walk loops
      obj.loop = true;
      // reset frame indices
      obj.frameIndex = 0;
      obj.vFrameIndex = 0;
      obj.tickCount = 0;
      obj.ticksPerFrame = 16;
      // unlock when running and wait for SPACE input
      game.unlock(); 
    };
    obj.jump = function() {
      // jump just reaches (no loop)
      obj.loop = false;
      // reset frame indices
      obj.frameIndex = 0;
      obj.vFrameIndex = 1;
      obj.tickCount = 0;
      obj.ticksPerFrame = 2;
      // lock when jumping
      game.lock(); 
    }

    obj.isWalking = function() {
      return obj.vFrameIndex === 0;
    };
    obj.isJumping = function() { 
      return obj.vFrameIndex === 1;
    };

    return obj;
  }

}( window.afable = window.afable || {} ));
