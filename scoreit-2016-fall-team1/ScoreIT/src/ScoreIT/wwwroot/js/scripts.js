// 1. Some Navigation and interaction logic.

var $body =   $( 'body' ),
    $html =   $( 'html' );

// Navigation
(function () {
    var $navItems   =   $( '.navigation a' ),
        $pages      =   $( '.page-game, .page-rankings, .page-profile' );

    $navItems.on( 'click', function (e) {
        e.preventDefault();

        $navItems
            .removeClass( 'active' )
            .filter( this )
            .addClass( 'active' );

        $pages
            .hide()
            .filter( '.page-' + $( this ).attr( 'href' ) )
            .show()
    });
})();

// Game page navigation
var $gameSetup  =   $( '.game-setup' ),
    $gamePlay   =   $( '.game-play' ),
    $gameFinish =   $( '.game-finished' );

function toggleSetupPlay () {
    $gameSetup
        .add( $gamePlay )
        .toggle();
};

function showFinishGame () {
    $gameSetup
        .add( $gamePlay )
        .hide();

    $gameFinish.show();
};

function showGameSetup () {
    $gameSetup.show();
    $gameFinish.hide();
};

// Goal Limit input slider
(function () {
    var $input  =   $( '.game-setup-goals-input input' ),
        $label  =   $( '.game-setup-goals h2 input' ),
        $pips   =   $( '.game-setup-goals-input-pips i');

    $input.on( 'input', function () {
        var value = this.value;

        $label.val( value );

        $pips
            .removeClass( 'selected' )
            .slice( 0, value )
            .addClass( 'selected' );
    });
})();


// Modal
var $modals             =   $( '.modal' ),
    $modalsCloseBtn     =   $modals.find( '.modal-close' );

function openModal ( modalName ) {
    $html.addClass( 'modal-view' );

    $modals
        .filter( '#' + modalName )
        .fadeIn( 200 );
}

function closeModal () {
    $modals.fadeOut( 100, function () {
        $html.removeClass( 'modal-view' );
    });
}

// Search

$( '.search input' ).on( 'input', function () {
    if( this.value ) {
        $( this ).addClass( 'populated' );
    } else {
        $( this ).removeClass( 'populated' );
    }
});

// Page Rankings sorting

(function () {
    var $sortButtons = $( '.page-rankings-sort button' );

    $sortButtons.on( 'click', function () {
        $sortButtons.removeClass( 'active' );
        $( this ).addClass( 'active' );
    });
})();


//
// 2. Logic which should definetly be in template/react render function
//

(function () {
    // Generating '.player-place' numbers and badges

    var playerPlace = 0;

    $( '.page-rankings-list .player' ).each( function () {
        var $this = $( this );

        $this
            .prepend( '<div class="player-place">' + playerPlace + '.</div>' );

        if ( playerPlace === 1 ) {
            $this
                .find( '.player-avatar' )
                .append( '<i class="badge gold">1st</i>' );
        } else if ( playerPlace === 2 ) {
            $this
                .find( '.player-avatar' )
                .append( '<i class="badge silver">2nd</i>' );
        } else if ( playerPlace === 3 ) {
            $this
                .find( '.player-avatar' )
                .append( '<i class="badge bronze">3rd</i>' );
        }

        playerPlace++;
    });

    // First item in '.page-rankings-list' is current app user (if not in top 10)
    $( '.page-rankings-list .player:first-child' )
        .addClass( 'current' )
        .find( '.player-place' )
        .text( '19.' );
})();





// $('.navigation .icon-profile').click();
