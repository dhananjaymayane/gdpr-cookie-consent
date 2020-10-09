( function() {
    var vm = new Vue({
        el: document.querySelector('#gdpr-mascot-app'),
        data: function() {
            return {
                showMenu: !1,
                isPro:mascot_obj.is_pro
            }
        },
        computed: (
            {
                boxClass() {
                    return {
                        'gdpr-mascot-quick-links gdpr-mascot-quick-links-open' : this.showMenu,
                        'gdpr-mascot-quick-links' : !this.showMenu,
                    }
                },
                menuItems() {
                    var mItems = [
                        {
                            icon: 'dashicons-lightbulb',
                            tooltip: 'Suggest a Feature',
                            link: 'https://wpeka.freshdesk.com/support/tickets/new',
                            key: 'suggest'
                        },
                        {
                            icon: 'dashicons-sos',
                            tooltip: 'Support & Docs',
                            link: 'https://docs.wpeka.com/wp-gdpr-cookie-consent/',
                            key: 'support'
                        },
                    ];
                    if(!this.isPro) {
                        mItems.push({
                            icon: 'dashicons-star-filled',
                            tooltip: 'Upgrade to Pro »',
                            link: 'https://club.wpeka.com/product/wp-gdpr-cookie-consent/',
                            key: 'upgrade'
                        });
                    }
                    return mItems;
                }
            }
        ),
        methods:{
            buttonClick: function(){
                this.showMenu = !this.showMenu;
            },
            renderElements:function(createElement) {
                var html = [];
                if(this.showMenu) {
                    this.menuItems.forEach((value, index) => {
                        html.push(createElement('a', {
                            key: value.key,
                            class: this.linkClass(value.key),
                            attrs: {
                                href: value.link,
                                'data-index': index,
                                target: '_blank'
                            }
                        }, [createElement('span', {
                            class: 'dashicons '+ value.icon
                        }), createElement('span', {
                            staticClass: 'gdpr-mascot-quick-link-title',
                            domProps: {
                                innerHTML: value.tooltip
                            }
                        })]));
                    })
                }
                return html;
            },
            linkClass: function(key) {
                return 'gdpr-mascot-quick-links-menu-item gdpr-mascot-quick-links-item-' + key;
            },
            enter:function(t,e) {
                var n = 50 * t.dataset.index;
                setTimeout((function() {
                    t.classList.add('gdpr-mascot-show'),
                    e()
                }), n)
            },
            leave:function(t,e) {
                t.classList.remove('gdpr-mascot-show'),
                setTimeout((function() {
                    e()
                }), 200)
            }
        },
        render(createElement){
          return createElement('div',{
              class: this.boxClass,
          }, [
              createElement('button', {
              class: 'gdpr-mascot-quick-links-label',
              on: {
                  click: this.buttonClick
              }
            },[
                createElement('span', {
                    class:'gdpr-mascot-bg-img gdpr-mascot-quick-links-mascot',
                }),
                  createElement('span',{
                      class: 'gdpr-mascot-quick-link-title'
                  }, 'See Quick Links')
              ]),
              createElement('transition-group', {
                  staticClass: 'gdpr-mascot-quick-links-menu',
                  attrs:{
                      tag: 'div',
                      name: 'gdpr-staggered-fade'
                  },
                  on: {
                      enter: this.enter,
                      leave: this.leave
                  }
              }, this.renderElements(createElement))
          ]);
        },
    });
})();