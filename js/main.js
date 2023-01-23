/* @author web@2dsd.ru | webtitov.ru */
'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const WebT = {};

  WebT.settings = {
    modal_active_class: '--modal-show'
  };

  WebT.elements = {
    main_container: document.getElementById('main_content'),
    modal_toggle: document.querySelectorAll('[data-modal-toggle]'),
    modal_box: document.querySelectorAll('[data-modal]'),
    overlay: document.querySelector('.theme-overlay'),
    close_modal: document.querySelectorAll('[data-modal-close]'),
    offer_nav_pos: document.getElementById('offer_nav').getBoundingClientRect().top + window.scrollY,
    offer_nav_height: document.getElementById('offer_nav').offsetHeight,
    to_top_button: document.getElementById('to_top')
  };


  /* Close all modals */
  const closeModals = () => {
    // close all modals
    for (let i=0; i < WebT.elements.modal_box.length; i++) {
      WebT.elements.modal_box[i].classList.remove(WebT.settings.modal_active_class);
    }
    // remove active classes from modal toggle buttons
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
    }
    document.body.classList.remove(WebT.settings.modal_active_class);
  }

  /* Stick offer nav on scroll */
  const fixOfferNav = () => {
    let scrollPosY = window.pageYOffset | document.body.scrollTop;

    if(scrollPosY > WebT.elements.offer_nav_pos) {
      document.body.classList.add('sticky-offer-nav');
      WebT.elements.main_container.style.marginTop = `${WebT.elements.offer_nav_height}px`;
    } else if(scrollPosY <= WebT.elements.offer_nav_pos) {
      document.body.classList.remove('sticky-offer-nav');
      WebT.elements.main_container.style.marginTop = '0px';
    }
  };

  /* To top button show */
  const toTopButton = () => {
    let scrollPosY = window.pageYOffset | document.body.scrollTop;

    if(scrollPosY > 500) {
      WebT.elements.to_top_button.classList.add('--show-button');
    } else if(scrollPosY <= 500) {
      WebT.elements.to_top_button.classList.remove('--show-button');
    }
  };

  /* Modals */
  (() => {
    // Add click event to close modals
    for (let i=0; i < WebT.elements.close_modal.length; i++) {
      WebT.elements.close_modal[i].addEventListener('click', () => {
        closeModals();
      });
    }
    // Add click event to open target modal
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].addEventListener('click', (e) => {
        e.preventDefault();
        let this_toggle = WebT.elements.modal_toggle[i],
            target_modal = this_toggle.getAttribute('data-modal-toggle');
        // if nav modal opened
        if (this_toggle.classList.contains(WebT.settings.modal_active_class)) {
          closeModals();
          WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
        } else {
          closeModals();
          document.querySelector(`[data-modal='${target_modal}']`).classList.add(WebT.settings.modal_active_class);
          document.body.classList.add(WebT.settings.modal_active_class);
          WebT.elements.modal_toggle[i].classList.add(WebT.settings.modal_active_class);
        }
      });
    }
  })();

  /* Scroll to top */
  (() => {
    WebT.elements.to_top_button.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  })();

  /* Cart button */
  (() => {
    document.getElementById('cart_button').addEventListener('click', () => {
      document.body.classList[document.body.classList.contains('--cart-opened') ? 'remove' : 'add']('--cart-opened');
    });
  })();

  /* cartJS init */

  
  /* Functions init */
  window.addEventListener('load', fixOfferNav);
  window.addEventListener('scroll', fixOfferNav);
  window.addEventListener('scroll', toTopButton);
});