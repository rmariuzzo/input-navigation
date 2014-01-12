/* global jQuery, document */
'use strict';

(function($) {

    var defaults = {
        cyclic: false,
        inputs: ':text', // a jQuery selector
        keybindings: {
            next: 40,
            prev: 38,
            up: 38,
            down: 40,
            right: 39,
            left: 37
        },
        direction: 'vector' // 'vector' or 'matrix'
    };

    // Constructor //

    /**
     * Construct a new InputNavigation object.
     *
     * @param container The container element.
     * @param options The options to use.
     */
    var InputNavigation = function(container, options) {
        this.$container = $(container);
        this.$options = $.extend({}, defaults, options);
        this.init();
    };

    // Methods //

    /**
     * Initialize everything needed before use.
     */
    InputNavigation.prototype.init = function() {
        var self = this;

        // Bind events.

        // Unbind previous events.
        self.$container.off('.input-navigation');

        // Handle input elements navigation by keybindings.
        self.$container.on('keydown.input-navigation.navigation', self.$options.inputs, function(event) {
            var dir = self.$options.direction;
            switch (dir) {
                case 'vector':
                    if (event.which === self.$options.keybindings.next) {
                        event.preventDefault();
                        self.next();
                    } else if (event.which === self.$options.keybindings.prev) {
                        event.preventDefault();
                        self.prev();
                    }
                    break;
                case 'matrix':
                    if (event.which === self.$options.keybindings.up) {
                        event.preventDefault();
                        self.up();
                    }
                    if (event.which === self.$options.keybindings.down) {
                        event.preventDefault();
                        self.down();
                    }
                    if (event.which === self.$options.keybindings.right) {
                        event.preventDefault();
                        self.right();
                    }
                    if (event.which === self.$options.keybindings.left) {
                        event.preventDefault();
                        self.left();
                    }
                    break;
                default:
                    makeError('Unknow direction option: ' + dir);
            }
        });

        // Track current focused input element.
        self.$container.on('focus.input-navigation.tracking', self.$options.inputs, function(event) {
            self.$current = $(event.target);
        });
    };

    /**
     * Navigate to next input field.
     */
    InputNavigation.prototype.next = function() {
        var $inputs = this.inputs();
        var index = $inputs.index(this.current()) + 1;
        if (this.$options.cyclic && index === $inputs.length) {
            index = 0;
        }
        $inputs.eq(index).trigger('focus').trigger('select');
    };

    /**
     * Navigate to previous input field.
     */
    InputNavigation.prototype.prev = function() {
        var $inputs = this.inputs();
        var index = $inputs.index(this.current()) - 1;
        if (this.$options.cyclic && index < 0) {
            index = $inputs.length - 1;
        }
        $inputs.eq(index).trigger('focus').trigger('select');
    };

    /**
     * Navigate to up direction.
     */
    InputNavigation.prototype.up = function() {
        // TODO implement me.
    };

    /**
     * Navigate to down direction.
     */
    InputNavigation.prototype.down = function() {
        // TODO implement me.
    };

    /**
     * Navigate to right direction.
     */
    InputNavigation.prototype.right = function() {
        // TODO implement me.
    };

    /**
     * Navigate to left direction.
     */
    InputNavigation.prototype.left = function() {
        // TODO implement me.
    };

    /**
     * Return the current focused element
     */
    InputNavigation.prototype.current = function() {
        return this.$current || this.$container.find(':focus');
    };

    /**
     * Get the offset of input elements.
     */
    InputNavigation.prototype.offsets = function() {
        return this.inputs().map(function() {
            return $(this).offset();
        });
    };

    /**
     * Return an array of inputs elements.
     */
    InputNavigation.prototype.inputs = function() {
        return this.$container.find(this.$options.inputs);
    };

    // jQuery plugin definition //

    $.fn.inputNavigation = function(options) {
        // Store any extra arguments for later use.
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function() {
            var $this = $(this);
            var instance = $this.data('inputNavigation');

            // Create or use existing instance.
            if (!instance || !(instance instanceof InputNavigation)) {
                $this.data('inputNavigation', (instance = new InputNavigation(this, options || instance)));
            }
            // Invoke method.
            if (typeof options === 'string' && $.isFunction(instance[options])) {
                instance[options].apply(instance, args);
            }
        });
    };

    // Data API //

    $(document).on('ready.input-navigation.data-api', function() {
        $('[data-input-navigation]').inputNavigation();
    });

    // Private functions //

    function makeError(msg) {
        throw new Error(msg);
    }

})(jQuery);
