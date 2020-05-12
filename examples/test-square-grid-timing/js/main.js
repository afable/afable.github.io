(function( afable, undefined ) {

  'use strict';

  /*
   * debuggin
   */
  let de = true;
  let bug = (console.log).bind(console);



  /**
   *  constants and globals
   */
  const VIEWPORT_GRID_HEIGHT = 6, VIEWPORT_GRID_WIDTH = 10;
  let canvas, ctx, grid;
  let square;

  let currtime, frametime, fps = 1/120 * 1000, lasttime = 0, state;



  /**
   * initialize game objects
   */
  (function init() {

    // set canvas context for 2d rendering and resize
    canvas = document.getElementsByTagName( 'canvas' )[0];
    ctx = canvas.getContext( '2d' );
    window.addEventListener( 'resize', onWindowResize, false );




    // window unit grid
    grid = new Grid( {
      colour: '#0f0',
      height: VIEWPORT_GRID_HEIGHT,
      width: VIEWPORT_GRID_WIDTH,
    });


    // test square
    square = new Square( {
      x: 0,
      y: 1,
      height: 1,
      width: 1,
    });







    // set canvas to fullscreen before beginning
    onWindowResize();

    // begin main game loop
    loop( undefined );

  }());



  /**
   *  main game loop
   */
  function loop( currtime ) {

    // test stop execution after 10 seconds
    if ( currtime > 1000 ) return;

    window.requestAnimationFrame( loop );

    frametime = currtime - lasttime;

    // test time functions
    de&&bug( currtime, lasttime, frametime, square.x );

    if ( frametime > fps ) {

      if ( frametime > 0 ) {
        integrate( frametime / 1000 );
        draw( state );
      }

      lasttime = currtime;

    }

  }



  /**
   * advance physics simulation forward
   */
  function integrate( dt ) {

    // test move square 1 grid unit ux per second
    square.x += dt;

  }



  /**
   *  render to screen
   */
  function draw( state ) {

    if ( de&&bug ) grid.draw();

    square.draw();

  }



  /**
   *  Grid background for debugging timesteps & movements
   *  @constructor
   */
  function Grid( ops ) {

    // safe-scope constructor
    if ( !(this instanceof Grid) ) {
      return new Grid( ops );
    }

    if ( !ops || !ops.colour || !ops.height || !ops.width ) {
      de&&bug( 'error in function Grid: option undefined' );
    }

    this.colour = ops.colour;
    this.height = ops.height;
    this.width = ops.width;
    this.ux = canvas.width / this.width;
    this.uy = canvas.height / this.height;

    // draw unit grid for debugging purposes
    this.draw = function() {

      let i;
      ctx.strokeStyle = this.colour;
      ctx.beginPath();

      // draw vertical lines
      ctx.moveTo( 0, 0 );
      for ( i = 0; i < this.width; ++i ) {
        ctx.lineTo( this.ux * i,  window.innerHeight );
        ctx.moveTo( this.ux * (i + 1), 0 );
      }

      // draw horizontal lines
      ctx.moveTo( 0, 0 );
      for ( i = 0; i < this.height; ++i ) {
        ctx.lineTo( window.innerWidth, this.uy * i );
        ctx.moveTo( 0, this.uy * (i + 1) );
      }
      ctx.stroke();

    }

    // update unit grid on window resize since canvas dimensions change
    this.onWindowResize = function() {

      this.ux = canvas.width / this.width;
      this.uy = canvas.height / this.height;

    }

  }



  /**
   *  Square placeholder for in-game objects
   *  @constructor
   */
  function Square( ops ) {

    // in case we forget new
    if ( !(this instanceof Square) ) {
      return new Square( ops );
    }

    // check for options
    if ( !ops || !ops.height || !ops.width || ops.x === undefined || ops.y === undefined ) {
      de&&bug( 'error in function Square: option undefined' );
    }

    this.height = ops.height;
    this.width = ops.width;
    this.x = ops.x;
    this.y = ops.y;

    this.draw = function() {

      ctx.beginPath();
      ctx.strokeStyle = '#faf';
      ctx.moveTo( this.x * grid.ux, this.y * grid.uy + this.height * grid.uy );
      ctx.lineTo( this.x * grid.ux, this.y * grid.uy );
      ctx.lineTo( this.x * grid.ux + this.width * grid.ux, this.y * grid.uy );
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#000';
      ctx.moveTo( this.x * grid.ux + this.width * grid.ux, this.y * grid.uy );
      ctx.lineTo( this.x * grid.ux + this.width * grid.ux, this.y * grid.uy + this.height * grid.uy );
      ctx.lineTo( this.x * grid.ux, this.y * grid.uy + this.height * grid.uy );
      ctx.stroke();

    }

  }



  /**
   * Retain unit grid & canvas full screen on window/viewport resizes
   */
  function onWindowResize() {

    // reset canvas height & width to viewport
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // resize grid units to match new window height & width
    grid.onWindowResize();

    // redraw screen immediately so ratios look good immediately
    draw( state );

  }



}( window.afable = window.afable || {} ));
