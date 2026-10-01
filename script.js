/* =========================================================
   CAP SANTÉ MARISTES — script.js
   Aucune bibliothèque externe : tout est en JavaScript natif.
   Pour modifier un texte de service, de soin ou de produit,
   il suffit de changer les données ci-dessous.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Coordonnées ---------- */
  var PHONES = [
    { label: '77 126 62 62', intl: '221771266262' },
    { label: '77 631 83 85', intl: '221776318385' }
  ];
  /* Chemin des images (ou images intégrées si window.CSM_IMAGES existe) */
  function src(name) { return (window.CSM_IMAGES && window.CSM_IMAGES[name]) || 'images/' + name; }

  /* ---------- Icônes (traits simples) ---------- */
  var ICONS = {
    sagefemme: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"/><path d="M9.5 12.5h5M12 10v5"/></svg>',
    gyneco: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><path d="M12 13v8M9 18h6"/></svg>',
    medecin: '<svg viewBox="0 0 24 24"><path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/></svg>',
    pediatre: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M9 10h.01M15 10h.01M9.5 14.5c1.4 1.2 3.6 1.2 5 0"/><path d="M12 4c-1 1.5-.5 3 1 3"/></svg>',
    accouchement: '<svg viewBox="0 0 24 24"><path d="M7 10a5 5 0 0 1 10 0c0 3-2 4-2 7H9c0-3-2-4-2-7z"/><path d="M9 20h6"/></svg>',
    massage: '<svg viewBox="0 0 24 24"><path d="M4 15c3-1 5-1 8 0s5 1 8 0"/><path d="M4 19c3-1 5-1 8 0s5 1 8 0"/><path d="M12 11V4M9 7l3-3 3 3"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ---------- Services (cartes + fenêtres) ---------- */
  var SERVICES = [
    {
      id: 'sage-femme', name: 'Sage-femme', icon: 'sagefemme', tone: 'rose',
      short: 'Pendant la grossesse, le jour J et après la naissance.',
      text: [
        'La sage-femme accompagne la future maman tout au long de la grossesse, puis après la naissance.',
        'C\'est souvent la première personne à qui l\'on pose ses questions. N\'hésitez pas à nous dire ce qui vous préoccupe en prenant rendez-vous.'
      ],
      keywords: 'grossesse enceinte suivi preparation naissance perinee reeducation'
    },
    {
      id: 'gynecologue', name: 'Gynécologue', icon: 'gyneco', tone: 'rose',
      short: 'Consultations gynécologiques et suivi de grossesse.',
      text: [
        'Une consultation gynécologique, un suivi de grossesse, une question sur votre santé de femme : le gynécologue du cabinet vous reçoit sur rendez-vous.',
        'Précisez le motif dans votre demande, cela nous aide à bien préparer votre venue.'
      ],
      keywords: 'gyneco femme consultation grossesse contraception'
    },
    {
      id: 'medecin', name: 'Médecin', icon: 'medecin', tone: 'green',
      short: 'Consultations de médecine pour toute la famille.',
      text: [
        'Pour une consultation, un problème de santé du quotidien ou un avis médical, le médecin du cabinet reçoit les adultes comme les plus jeunes.',
        'Indiquez-nous si la demande est urgente : nous ferons au mieux pour vous recevoir rapidement.'
      ],
      keywords: 'docteur generaliste consultation famille adulte'
    },
    {
      id: 'pediatre', name: 'Pédiatre', icon: 'pediatre', tone: 'green',
      short: 'Le suivi de votre enfant, dès ses premiers jours.',
      text: [
        'Le pédiatre suit la santé et la croissance de votre enfant, du nourrisson au plus grand.',
        'Pensez à apporter le carnet de santé de l\'enfant lors du rendez-vous.'
      ],
      keywords: 'enfant bebe nourrisson croissance pediatrie'
    },
    {
      id: 'accouchement', name: 'Accouchement', icon: 'accouchement', tone: 'green',
      image: 'maman-bebe.jpg', imagePos: '20% 30%', imageAlt: 'Une maman tient son bébé contre elle',
      short: 'Préparer l\'arrivée de bébé, et être accompagnée le jour venu.',
      text: [
        'Le cabinet vous accompagne pour l\'accouchement. Le mieux est d\'en parler tôt pendant la grossesse, pour préparer ensemble ce moment.',
        'Pour partir sereine, vous pouvez aussi nous confier la préparation de votre valise de maternité.'
      ],
      link: { href: '#produits', label: 'Voir les valises de maternité' },
      keywords: 'naissance maternite accoucher bebe valise'
    },
    {
      id: 'damp', name: 'Massage traditionnel « Damp »', icon: 'massage', tone: 'rose',
      image: 'flyer-massage-postnatal.jpg', poster: true, imageAlt: 'Brochure Massages postnatal : massage simple et massage traditionnel',
      short: 'Le rituel après l\'accouchement : karité et bain chaud aux plantes.',
      text: [
        'Un rituel postnatal traditionnel avec massage au beurre de karité, suivi d\'un bain chaud aux plantes, pour apaiser la maman et envelopper bébé de douceur.',
        'Durée : environ 60 minutes. Massage réservé aux femmes.'
      ],
      keywords: 'damp massage traditionnel postnatal karite bain plantes bebe maman'
    }
  ];

  /* ---------- Soins « Tout pour la femme » (repris des brochures) ---------- */
  var CARE = [
    {
      id: 'massage-prenatal', kind: 'Massage prénatal', name: 'Massage prénatal', duration: '60 min',
      image: 'flyer-massage-prenatal.jpg', imageAlt: 'Brochure Massage prénatal, 60 minutes',
      text: 'Un soin doux conçu pour la future maman, afin de soulager les tensions, alléger les jambes et favoriser une profonde détente.',
      keywords: 'grossesse enceinte jambes detente prenatal'
    },
    {
      id: 'massage-postnatal-simple', kind: 'Massage postnatal', name: 'Massage simple', duration: '45 min',
      image: 'flyer-massage-postnatal.jpg', imageAlt: 'Brochure Massages postnatal : massage simple 45 minutes',
      text: 'Un soin doux et relaxant, réalisé avec une huile adaptée pour détendre le corps, apaiser les tensions et offrir un vrai moment de bien-être.',
      keywords: 'apres accouchement huile relaxant postnatal'
    },
    {
      id: 'massage-traditionnel', kind: 'Massage postnatal · Damp', name: 'Massage traditionnel', duration: '60 min',
      image: 'flyer-massages.jpg', imageAlt: 'Brochure Massages, exclusivement aux femmes',
      text: 'Massage au beurre de karité, suivi d\'un bain chaud aux plantes, pour apaiser la maman et envelopper bébé de douceur.',
      keywords: 'damp karite bain plantes bebe traditionnel'
    },
    {
      id: 'reeducation-sans-effort', kind: 'Rééducation périnéale', name: 'Sans effort physique', duration: '20 à 30 min',
      image: 'flyer-reeducation-perineale.jpg', imageAlt: 'Brochure Rééducation périnéale, avec et sans effort physique',
      text: 'Une méthode douce, sans effort physique, qui utilise une technologie adaptée pour stimuler et renforcer le périnée.',
      keywords: 'perinee reeducation machine apres accouchement'
    },
    {
      id: 'reeducation-avec-effort', kind: 'Rééducation périnéale', name: 'Avec effort physique', duration: '30 à 45 min',
      image: 'flyer-reeducation-perineale.jpg', imageAlt: 'Brochure Rééducation périnéale, avec et sans effort physique',
      text: 'Un accompagnement personnalisé avec des exercices guidés, sans machine, pour renforcer le périnée et retrouver confort et confiance.',
      keywords: 'perinee reeducation exercices apres accouchement'
    }
  ];

  /* ---------- Formules de valises (repris des brochures) ---------- */
  var FORMULAS = [
    {
      id: 'essentielle', name: 'Essentielle', flyer: 'flyer-valise-essentielle.jpg',
      intro: 'Les indispensables pour le séjour à la maternité.',
      maman: ['2 pyjamas', 'Robe de chambre', '4 culottes', 'Paire de claquettes', '2 paires de chaussettes', 'Soutien-gorge d\'allaitement', 'Paquet de serviettes hygiéniques', 'Brosse à dents', 'Sac à linge sale'],
      bebe: ['3 bodies', '3 pyjamas', '3 paires de chaussettes', 'Bonnet', 'Bavoir', 'Grande couverture', 'Serviette pour bébé', 'Couches pour bébé', 'Lingettes', 'Tétine']
    },
    {
      id: 'confort', name: 'Confort', flyer: 'flyer-valise-confort.jpg',
      intro: 'Tout l\'Essentielle, avec davantage de tenues, de produits de soin et d\'accessoires pratiques.',
      maman: ['2 pyjamas adaptés à l\'allaitement', '2 pyjamas simples', '2 robes de chambre', '4 culottes', 'Paire de claquettes', '3 paires de chaussettes', '2 soutiens-gorge d\'allaitement', '2 paquets de serviettes hygiéniques', 'Coussinets d\'allaitement', 'Gourde', '2 sacs à linge sale', 'Trousse de toilette simple'],
      bebe: ['5 bodies', '5 pyjamas', '5 paires de chaussettes', '3 bonnets', '2 bavoirs', 'Grande couverture', 'Couverture légère', 'Serviette pour bébé', '2 paquets de couches', 'Lingettes', 'Coussinets', 'Tétine', 'Biberon']
    },
    {
      id: 'premium', name: 'Premium', flyer: 'flyer-valise-premium.jpg',
      intro: 'La Confort, enrichie de produits haut de gamme, de tenues raffinées et de petites attentions pour maman et bébé. Valise personnalisable.',
      maman: ['3 chemises de nuit', '3 robes de chambre', 'Tenue de sortie', '4 soutiens-gorge d\'allaitement', '10 culottes', '3 paquets de serviettes hygiéniques', 'Trousse de toilette', 'Paire de claquettes', '2 sacs à linge sale', 'Gourde', 'Coussinets d\'allaitement', 'Tire-lait', 'Pochette pour documents', 'Checklist de maternité'],
      bebe: ['8 bodies', '8 pyjamas', '6 bonnets', '7 paires de chaussettes', '4 bavoirs', '2 couvertures', 'Serviette pour bébé', '3 paquets de couches', 'Lingettes', 'Doudou', 'Tétine', 'Biberon', 'Carte de bienvenue']
    },
    {
      id: 'sur-mesure', name: 'Sur mesure', flyer: 'flyer-valise-sur-mesure.jpg',
      intro: 'Créez une valise unique, adaptée à vos envies, vos besoins et votre budget. Vous choisissez les articles pour maman et bébé, et nous préparons chaque détail avec soin.',
      maman: null, bebe: null
    }
  ];

  /* ---------- Produits ---------- */
  var PRODUCTS = [
    {
      id: 'valise-maman', tag: 'Pour maman', name: 'Valise d\'accouchement maman',
      image: 'flyer-valises.jpg', poster: true, imagePos: 'center', imageAlt: 'Brochure Valises de maternité : Essentielle, Confort, Premium et Sur mesure',
      text: 'Pyjamas, robe de chambre, soutiens-gorge d\'allaitement, serviettes hygiéniques… tout ce qu\'il faut pour votre séjour, déjà rangé.',
      side: 'maman', keywords: 'valise maternite maman sac kit allaitement'
    },
    {
      id: 'valise-bebe', tag: 'Pour bébé', name: 'Valise d\'accouchement bébé',
      image: 'maman-bebe.jpg', imagePos: '30% top', imageAlt: 'Un bébé dans les bras de sa maman',
      text: 'Bodies, pyjamas, bonnets, couverture, couches, lingettes : les premières affaires de bébé, prêtes pour la maternité.',
      side: 'bebe', keywords: 'valise maternite bebe kit naissance layette'
    },
    {
      id: 'karite', tag: 'Soin', name: 'Beurre de karité pour massage',
      image: 'flyer-massages.jpg', poster: true, imagePos: 'center', imageAlt: 'Brochure Massages : rééducation périnéale, massage prénatal et massage postnatal',
      text: 'Le beurre de karité que nous utilisons pour le massage traditionnel. Demandez-nous conseil pour l\'utiliser à la maison.',
      side: null, keywords: 'karite beurre massage damp soin peau'
    }
  ];

  /* ---------- Brochures (galerie) ---------- */
  var BROCHURES = [
    ['tout-pour-la-femme.jpg', 'Tout pour la femme, une attention particulière pour chaque patient'],
    ['flyer-massages.jpg', 'Massages, exclusivement aux femmes'],
    ['flyer-massage-prenatal.jpg', 'Massage prénatal'],
    ['flyer-massage-postnatal.jpg', 'Massages postnatal'],
    ['flyer-reeducation-perineale.jpg', 'Rééducation périnéale'],
    ['flyer-valises.jpg', 'Valises de maternité'],
    ['flyer-valise-essentielle.jpg', 'Valise Essentielle'],
    ['flyer-valise-confort.jpg', 'Valise Confort'],
    ['flyer-valise-premium.jpg', 'Valise Premium'],
    ['flyer-valise-sur-mesure.jpg', 'Valise sur mesure']
  ];

  /* ---------- Utilitaires ---------- */
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var root = document.documentElement;

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(str) {
    return String(str).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ');
  }
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
    } catch (e) { return null; }
  }
  function waLink(intl, text) {
    return 'https://wa.me/' + intl + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  var inFrame = (function () { try { return window.self !== window.top; } catch (e) { return true; } })();

  /* ---------- Notifications ---------- */
  var toastBox = $('#toasts');
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    toastBox.appendChild(t);
    setTimeout(function () {
      t.classList.add('out');
      setTimeout(function () { t.remove(); }, 320);
    }, 2600);
  }

  /* ---------- Rendu : services ---------- */
  function renderServices() {
    $('#service-grid').innerHTML = SERVICES.map(function (s) {
      var photo = (s.image && !s.poster)
        ? '<span class="card-photo"><img src="' + src(s.image) + '" alt="" loading="lazy" style="object-position:' + (s.imagePos || 'center') + '"></span>'
        : '<span class="service-icon" aria-hidden="true">' + ICONS[s.icon] + '</span>';
      return '<button type="button" class="service-card reveal ' + (s.tone === 'rose' ? 'rose' : '') + ((s.image && !s.poster) ? ' has-photo' : '') + '" data-service="' + s.id + '">' +
        '<span class="card-top">' + photo + '<strong class="card-title">' + esc(s.name) + '</strong></span>' +
        '<span class="card-text">' + esc(s.short) + '</span>' +
        '<span class="service-more">En savoir plus ' + ICONS.arrow + '</span>' +
        '</button>';
    }).join('');

    var select = $('#f-service');
    var opts = SERVICES.map(function (s) { return s.name; })
      .concat(CARE.map(function (c) { return c.kind + ' : ' + c.name; }))
      .concat(['Valise de maternité', 'Autre demande']);
    opts.forEach(function (name) {
      var o = document.createElement('option');
      o.value = name; o.textContent = name;
      select.appendChild(o);
    });
  }

  /* ---------- Rendu : soins ---------- */
  function renderCare() {
    $('#care-grid').innerHTML = CARE.map(function (c) {
      return '<button type="button" class="care-card reveal" data-care="' + c.id + '">' +
        '<img src="' + src(c.image) + '" alt="" loading="lazy" width="96" height="128">' +
        '<span class="care-body">' +
          '<span class="care-kind">' + esc(c.kind) + '</span>' +
          '<strong class="card-title">' + esc(c.name) + '</strong>' +
          '<span class="care-text">' + esc(c.text) + '</span>' +
          '<span class="duration">⏱ ' + esc(c.duration) + '</span>' +
        '</span></button>';
    }).join('');
  }

  /* ---------- Rendu : produits ---------- */
  function renderProducts() {
    $('#product-grid').innerHTML = PRODUCTS.map(function (p) {
      return '<article class="product-card reveal">' +
        '<div class="product-photo' + (p.poster ? ' poster' : '') + '"><img src="' + src(p.image) + '" alt="' + esc(p.imageAlt) + '" loading="lazy" style="object-position:' + p.imagePos + '"></div>' +
        '<div class="product-body">' +
          '<span class="product-tag">' + esc(p.tag) + '</span>' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<p>' + esc(p.text) + '</p>' +
          '<button type="button" class="btn btn-ghost" data-product="' + p.id + '">En savoir plus</button>' +
        '</div></article>';
    }).join('');
  }

  /* ---------- Formules (onglets) ---------- */
  var tabsEl = $('#formula-tabs');
  var panelEl = $('#formula-panel');
  function listHtml(items) {
    return '<ul>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
  }
  function showFormula(id, focus) {
    var f = FORMULAS.filter(function (x) { return x.id === id; })[0] || FORMULAS[0];
    $$('.tab', tabsEl).forEach(function (t) {
      var on = t.dataset.formula === f.id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    var cols = f.maman
      ? '<div class="formula-col"><h4>Maman</h4>' + listHtml(f.maman) + '</div>' +
        '<div class="formula-col"><h4>Bébé</h4>' + listHtml(f.bebe) + '</div>'
      : '<div class="formula-col" style="grid-column: span 2"><h4>Vous choisissez, nous préparons</h4>' +
        '<p class="muted">Dites-nous ce dont vous avez besoin pour vous et pour bébé, et votre budget. Nous composons la valise avec vous, article par article.</p></div>';
    panelEl.innerHTML =
      '<p class="formula-intro">' + esc(f.intro) + '</p>' + cols +
      '<button type="button" class="formula-flyer" data-zoom="' + f.flyer + '" data-alt="Brochure valise ' + esc(f.name) + '">' +
        '<img src="' + src(f.flyer) + '" alt="Brochure de la valise ' + esc(f.name) + '" loading="lazy"><span>Voir la brochure</span></button>' +
      '<div class="formula-cta btn-row">' +
        '<a class="btn btn-wa js-wa" target="_blank" rel="noopener" href="' + waLink(PHONES[0].intl, 'Bonjour CAP SANTÉ MARISTES, je souhaite des informations sur la valise de maternité ' + f.name + '.') + '">Demander la valise ' + esc(f.name) + '</a>' +
        '<span class="muted">Prix et disponibilité sur demande.</span></div>';
    panelEl.classList.remove('fade'); void panelEl.offsetWidth; panelEl.classList.add('fade');
  }
  function renderFormulas() {
    tabsEl.innerHTML = FORMULAS.map(function (f) {
      return '<button type="button" class="tab" role="tab" data-formula="' + f.id + '" aria-controls="formula-panel">' + esc(f.name) + '</button>';
    }).join('');
    showFormula('essentielle');
    tabsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.tab');
      if (b) showFormula(b.dataset.formula);
    });
    tabsEl.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var tabs = $$('.tab', tabsEl);
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      i = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      showFormula(tabs[i].dataset.formula, true);
    });
  }

  /* ---------- Brochures ---------- */
  function renderBrochures() {
    $('#brochure-row').innerHTML = BROCHURES.map(function (b) {
      return '<button type="button" data-zoom="' + b[0] + '" data-alt="' + esc(b[1]) + '" aria-label="Agrandir : ' + esc(b[1]) + '">' +
        '<img src="' + src(b[0]) + '" alt="' + esc(b[1]) + '" loading="lazy" width="150" height="212"></button>';
    }).join('');
  }

  /* ---------- Fenêtre (modal) ---------- */
  var modal = $('#modal');
  var modalBox = $('.modal-box', modal);
  var modalContent = $('#modal-content');
  var lastFocus = null;

  function openLayer(layer, focusEl) {
    lastFocus = document.activeElement;
    layer.hidden = false;
    layer.classList.remove('closing');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { (focusEl || layer).focus(); }, 30);
  }
  function closeLayer(layer) {
    if (layer.hidden || layer.classList.contains('closing')) return;
    var lite = root.classList.contains('lite');
    layer.classList.add('closing');
    setTimeout(function () {
      layer.hidden = true;
      layer.classList.remove('closing');
      if ($('#modal').hidden && $('#search').hidden) document.body.style.overflow = '';
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    }, lite ? 0 : 210);
  }
  function rdvButton(serviceName) {
    return '<button type="button" class="btn btn-primary" data-book="' + esc(serviceName) + '">Prendre rendez-vous</button>';
  }

  function openService(id) {
    var s = SERVICES.filter(function (x) { return x.id === id; })[0];
    if (!s) return;
    var media = s.image
      ? '<div class="m-media' + (s.poster ? ' poster' : '') + '"><img src="' + src(s.image) + '" alt="' + esc(s.imageAlt) + '" style="object-position:' + (s.imagePos || 'center') + '"></div>'
      : '<div class="m-media icon-media" aria-hidden="true">' + ICONS[s.icon] + '</div>';
    modalContent.innerHTML = '<div class="m-layout">' + media +
      '<div class="m-body"><p class="eyebrow">Nos services</p><h2 id="modal-title">' + esc(s.name) + '</h2>' +
      s.text.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
      '<div class="btn-row">' + rdvButton(s.name) +
      (s.link ? '<a class="btn btn-link" href="' + s.link.href + '" data-close-nav>' + esc(s.link.label) + ' →</a>' : '') +
      '</div></div></div>';
    openLayer(modal, modalBox);
  }

  function openCare(id) {
    var c = CARE.filter(function (x) { return x.id === id; })[0];
    if (!c) return;
    modalContent.innerHTML = '<div class="m-layout">' +
      '<div class="m-media poster"><img src="' + src(c.image) + '" alt="' + esc(c.imageAlt) + '"></div>' +
      '<div class="m-body"><p class="eyebrow">' + esc(c.kind) + '</p><h2 id="modal-title">' + esc(c.name) + '</h2>' +
      '<p>' + esc(c.text) + '</p>' +
      '<p class="m-note">Durée : <strong>' + esc(c.duration) + '</strong> · Soin réservé aux femmes.</p>' +
      '<div class="btn-row">' + rdvButton(c.kind + ' : ' + c.name) + '</div></div></div>';
    openLayer(modal, modalBox);
  }

  function openProduct(id) {
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var body = '<p>' + esc(p.text) + '</p>';
    if (p.side) {
      body += '<p>Ce que contient la partie ' + (p.side === 'maman' ? 'maman' : 'bébé') + ' de chaque formule :</p>';
      FORMULAS.forEach(function (f) {
        if (f[p.side]) body += '<p><strong>' + esc(f.name) + '</strong> : ' + esc(f[p.side].join(', ')) + '.</p>';
      });
      body += '<p class="m-note">Vous préférez choisir vous-même ? La formule <strong>Sur mesure</strong> s\'adapte à vos envies et à votre budget.</p>';
    } else {
      body += '<p class="m-note">C\'est aussi le beurre de karité utilisé pour le massage traditionnel « Damp ».</p>';
    }
    var msg = 'Bonjour CAP SANTÉ MARISTES, je souhaite des informations sur : ' + p.name + '.';
    modalContent.innerHTML = '<div class="m-layout">' +
      '<div class="m-media' + (p.poster ? ' poster' : '') + '"><img src="' + src(p.image) + '" alt="' + esc(p.imageAlt) + '" style="object-position:' + p.imagePos + '"></div>' +
      '<div class="m-body"><p class="eyebrow">' + esc(p.tag) + '</p><h2 id="modal-title">' + esc(p.name) + '</h2>' + body +
      '<div class="btn-row"><a class="btn btn-wa js-wa" target="_blank" rel="noopener" href="' + waLink(PHONES[0].intl, msg) + '">Demander sur WhatsApp</a>' +
      (p.side ? '<a class="btn btn-link" href="#formules" data-close-nav>Comparer les formules →</a>' : '') +
      '</div></div></div>';
    openLayer(modal, modalBox);
  }

  function openZoom(src, alt) {
    modalContent.innerHTML = '<h2 id="modal-title" class="sr-only">' + esc(alt) + '</h2>' +
      '<div class="m-full"><img src="' + src(src) + '" alt="' + esc(alt) + '"></div>';
    openLayer(modal, modalBox);
  }

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) { closeLayer(modal); return; }
    var book = e.target.closest('[data-book]');
    if (book) { closeLayer(modal); goToBooking(book.dataset.book); return; }
    if (e.target.closest('[data-close-nav]')) closeLayer(modal);
  });

  /* Garde le focus clavier à l'intérieur de la fenêtre ouverte */
  function trapFocus(e, layer) {
    var f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]', layer).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === layer.querySelector('[role="dialog"]'))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  document.addEventListener('keydown', function (e) {
    var search = $('#search');
    var open = !modal.hidden ? modal : (!search.hidden ? search : null);
    if (!open) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLayer(open); }
    if (e.key === 'Tab') trapFocus(e, open);
  });

  /* Délégation de clics pour les cartes générées */
  document.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-service]'))) return openService(el.dataset.service);
    if ((el = e.target.closest('[data-care]'))) return openCare(el.dataset.care);
    if ((el = e.target.closest('[data-product]'))) return openProduct(el.dataset.product);
    if ((el = e.target.closest('[data-zoom]'))) return openZoom(el.dataset.zoom, el.dataset.alt || '');
    if ((el = e.target.closest('.js-wa'))) toast('Ouverture de WhatsApp…');
  });

  /* ---------- Menu mobile ---------- */
  var nav = $('#main-nav');
  var burger = $('#menu-toggle');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); burger.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 980 && nav.classList.contains('open')) setMenu(false); });

  /* ---------- Mode sombre ---------- */
  var themeBtn = $('#theme-toggle');
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function syncThemeLabel() {
    themeBtn.setAttribute('aria-label', isDark() ? 'Passer en mode clair' : 'Passer en mode sombre');
  }
  themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('csm-theme', next);
    syncThemeLabel();
    toast(next === 'dark' ? 'Mode sombre activé.' : 'Mode clair activé.');
  });
  syncThemeLabel();

  /* ---------- Mode léger (optimisation) ---------- */
  var liteBtn = $('#lite-toggle');
  function syncLite() {
    var on = root.classList.contains('lite');
    liteBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    liteBtn.setAttribute('aria-label', on ? 'Désactiver le mode léger' : 'Activer le mode léger');
  }
  liteBtn.addEventListener('click', function () {
    var on = !root.classList.contains('lite');
    root.classList.toggle('lite', on);
    store('csm-lite', on ? '1' : '0');
    if (on) $$('.reveal.pre').forEach(function (el) { el.classList.remove('pre'); });
    syncLite();
    toast(on ? 'Mode léger activé : moins d\'animations, plus rapide.' : 'Mode léger désactivé.');
  });
  /* Active le mode léger automatiquement si le téléphone est en économie de données */
  try {
    if (store('csm-lite') === null && navigator.connection && navigator.connection.saveData) root.classList.add('lite');
  } catch (e) {}
  syncLite();

  /* ---------- Recherche ---------- */
  var searchLayer = $('#search');
  var searchInput = $('#search-input');
  var resultsEl = $('#search-results');
  var INDEX = [];
  function buildIndex() {
    SERVICES.forEach(function (s) {
      INDEX.push({ kind: 'Service', title: s.name, text: s.short, hay: norm(s.name + ' ' + s.short + ' ' + s.text.join(' ') + ' ' + s.keywords), go: function () { openService(s.id); } });
    });
    CARE.forEach(function (c) {
      INDEX.push({ kind: c.kind, title: c.name + ' · ' + c.duration, text: c.text, hay: norm(c.kind + ' ' + c.name + ' ' + c.text + ' massage soin femme ' + c.keywords), go: function () { openCare(c.id); } });
    });
    PRODUCTS.forEach(function (p) {
      INDEX.push({ kind: 'Produit', title: p.name, text: p.text, hay: norm(p.name + ' ' + p.text + ' produits ' + p.keywords), go: function () { openProduct(p.id); } });
    });
    FORMULAS.forEach(function (f) {
      INDEX.push({ kind: 'Formule de valise', title: 'Valise ' + f.name, text: f.intro, hay: norm('valise formule produits maternite ' + f.name + ' ' + f.intro + ' ' + (f.maman || []).join(' ') + ' ' + (f.bebe || []).join(' ')), go: function () { scrollToId('formules'); showFormula(f.id); } });
    });
    [
      ['Page', 'Prendre rendez-vous', 'Formulaire de demande, envoyé par WhatsApp.', 'rendez vous rdv reserver consultation formulaire', 'rendez-vous'],
      ['Page', 'Nous joindre', '+221 77 126 62 62 · +221 77 631 83 85', 'contact telephone numero appeler whatsapp adresse maristes dakar', 'contact'],
      ['Page', 'Notre équipe', 'Sage-femme, gynécologue, médecin, pédiatre.', 'equipe personnel docteur professionnels', 'equipe'],
      ['Page', 'Le cabinet', 'Bienvenue à CAP SANTÉ MARISTES.', 'cabinet presentation maristes dakar', 'cabinet'],
      ['Page', 'Brochures', 'Les visuels officiels du cabinet.', 'brochures flyers images photos', 'produits']
    ].forEach(function (p) {
      INDEX.push({ kind: p[0], title: p[1], text: p[2], hay: norm(p[1] + ' ' + p[2] + ' ' + p[3]), go: function () { scrollToId(p[4]); } });
    });
  }
  var currentResults = [];
  function runSearch(q) {
    var words = norm(q).split(/\s+/).filter(Boolean);
    if (!words.length) { resultsEl.innerHTML = ''; currentResults = []; return; }
    currentResults = INDEX.filter(function (item) {
      return words.every(function (w) { return item.hay.indexOf(w) !== -1 || item.hay.indexOf(w.replace(/s$/, '')) !== -1; });
    }).slice(0, 8);
    if (!currentResults.length) {
      resultsEl.innerHTML = '<li class="search-empty">Aucun résultat pour « ' + esc(q) + ' ». Essayez un autre mot, ou écrivez-nous sur WhatsApp.</li>';
      return;
    }
    resultsEl.innerHTML = currentResults.map(function (r, i) {
      return '<li><button type="button" data-result="' + i + '"><span class="sr-kind">' + esc(r.kind) + '</span><span class="sr-title">' + esc(r.title) + '</span><span class="sr-text">' + esc(r.text) + '</span></button></li>';
    }).join('');
  }
  function openSearch() {
    if (nav.classList.contains('open')) setMenu(false);
    openLayer(searchLayer, searchInput);
  }
  $('#search-open').addEventListener('click', openSearch);
  searchInput.addEventListener('input', function () { runSearch(searchInput.value); });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && currentResults[0]) { e.preventDefault(); pick(0); }
    if (e.key === 'ArrowDown') { var b = $('[data-result]', resultsEl); if (b) { e.preventDefault(); b.focus(); } }
  });
  function pick(i) {
    var r = currentResults[i];
    if (!r) return;
    searchLayer.hidden = true;
    document.body.style.overflow = '';
    r.go();
  }
  searchLayer.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) return closeLayer(searchLayer);
    var hint = e.target.closest('[data-q]');
    if (hint) { searchInput.value = hint.dataset.q; runSearch(hint.dataset.q); searchInput.focus(); return; }
    var res = e.target.closest('[data-result]');
    if (res) pick(Number(res.dataset.result));
  });
  /* Raccourci clavier : « / » ouvre la recherche */
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName) && searchLayer.hidden && modal.hidden) {
      e.preventDefault(); openSearch();
    }
  });

  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: root.classList.contains('lite') ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- Formulaire de rendez-vous ---------- */
  var form = $('#rdv-form');
  var done = $('#rdv-done');
  var dateInput = $('#f-date');
  (function setMinDate() {
    var d = new Date();
    var iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    dateInput.min = iso;
  })();

  function goToBooking(serviceName) {
    var select = $('#f-service');
    if (serviceName) {
      var found = $$('option', select).some(function (o) { return o.value === serviceName; });
      if (found) select.value = serviceName;
    }
    form.hidden = false; done.hidden = true;
    scrollToId('rendez-vous');
    setTimeout(function () { $('#f-name').focus({ preventScroll: true }); }, 500);
  }

  function setError(id, msg) {
    var field = $('#f-' + id).closest('.field');
    field.classList.toggle('invalid', !!msg);
    $('#e-' + id).textContent = msg || '';
    $('#f-' + id).setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) $('#f-' + id).setAttribute('aria-describedby', 'e-' + id); else $('#f-' + id).removeAttribute('aria-describedby');
  }
  function validate(data) {
    var ok = true;
    function check(id, cond, msg) { setError(id, cond ? '' : msg); if (!cond) ok = false; }
    check('name', data.name.length >= 2, 'Indiquez votre nom et prénom.');
    check('phone', data.phone.replace(/\D/g, '').length >= 9, 'Indiquez un numéro de téléphone complet, par exemple 77 000 00 00.');
    check('email', !data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email), 'Cette adresse email ne semble pas complète. Vous pouvez aussi laisser ce champ vide.');
    check('service', !!data.service, 'Choisissez le service souhaité.');
    check('date', !!data.date && (!dateInput.min || data.date >= dateInput.min), 'Choisissez une date à partir d\'aujourd\'hui.');
    check('time', !!data.time, 'Choisissez une heure.');
    return ok;
  }
  function frDate(iso) {
    var p = iso.split('-');
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    try { return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }
    catch (e) { return p[2] + '/' + p[1] + '/' + p[0]; }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {
      name: $('#f-name').value.trim(),
      phone: $('#f-phone').value.trim(),
      email: $('#f-email').value.trim(),
      service: $('#f-service').value,
      date: dateInput.value,
      time: $('#f-time').value,
      message: $('#f-msg').value.trim()
    };
    if (!validate(data)) {
      var firstBad = $('.field.invalid input, .field.invalid select', form);
      if (firstBad) firstBad.focus();
      toast('Quelques informations manquent dans le formulaire.');
      return;
    }
    var lines = [
      'Bonjour CAP SANTÉ MARISTES,',
      'je souhaite prendre rendez-vous.',
      '',
      'Nom : ' + data.name,
      'Téléphone : ' + data.phone
    ];
    if (data.email) lines.push('Email : ' + data.email);
    lines.push('Service : ' + data.service);
    lines.push('Date souhaitée : ' + frDate(data.date));
    lines.push('Heure souhaitée : ' + data.time);
    if (data.message) lines.push('Motif : ' + data.message);
    lines.push('', 'Merci de me confirmer la disponibilité.');
    var text = lines.join('\n');

    $('#rdv-wa1').href = waLink(PHONES[0].intl, text);
    $('#rdv-wa2').href = waLink(PHONES[1].intl, text);
    var rows = [['Nom', data.name], ['Téléphone', data.phone], ['Service', data.service], ['Date', frDate(data.date)], ['Heure', data.time]];
    if (data.message) rows.push(['Motif', data.message]);
    $('#rdv-summary').innerHTML = rows.map(function (r) {
      return '<div><span>' + esc(r[0]) + '</span><span>' + esc(r[1]) + '</span></div>';
    }).join('');

    form.hidden = true;
    done.hidden = false;
    done.focus();
    toast('Votre demande est prête.');
  });
  form.addEventListener('input', function (e) {
    var f = e.target.closest('.field');
    if (f && f.classList.contains('invalid')) setError(e.target.id.replace('f-', ''), '');
  });
  $('#rdv-edit').addEventListener('click', function () {
    done.hidden = true; form.hidden = false; $('#f-name').focus();
  });

  /* Tous les liens « Prendre rendez-vous » ouvrent le formulaire, même après un envoi */
  $$('a[href="#rendez-vous"]').forEach(function (a) {
    a.addEventListener('click', function () { if (form.hidden) { form.hidden = false; done.hidden = true; } });
  });

  /* ---------- Copier ---------- */
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }
  $$('.js-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.dataset.copy;
      var msg = btn.dataset.msg || 'Numéro copié.';
      var done = function () {
        toast(msg);
        var old = btn.textContent;
        btn.textContent = 'Copié ✓';
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      var fail = function () {
        if (fallbackCopy(text)) done();
        else toast('Copie impossible ici. Sélectionnez le texte : ' + text);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fail);
      } else fail();
    });
  });

  /* ---------- Impression ---------- */
  var printBtn = $('#print-btn');
  if (inFrame) {
    /* Dans un aperçu intégré, l'impression n'est pas disponible : on masque le bouton */
    printBtn.hidden = true;
  } else {
    printBtn.addEventListener('click', function () { window.print(); });
  }

  /* ---------- En-tête au défilement + retour en haut ---------- */
  var header = $('.site-header');
  var toTop = $('#to-top');
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      header.classList.toggle('scrolled', y > 8);
      toTop.classList.toggle('show', y > 500);
      ticking = false;
    });
  }, { passive: true });
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: root.classList.contains('lite') ? 'auto' : 'smooth' });
    $('.brand').focus({ preventScroll: true });
  });

  /* ---------- Lien actif dans le menu ---------- */
  function watchSections() {
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    $$('.main-nav ul a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id === 'femme' ? 'services' : en.target.id;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach(function (s) { io.observe(s); });
  }

  /* ---------- Apparitions discrètes ----------
     Seuls les éléments situés plus bas que l'écran sont masqués au départ :
     ce qui est visible au chargement s'affiche immédiatement. */
  function revealOnScroll() {
    var els = $$('.reveal');
    if (root.classList.contains('lite') || !('IntersectionObserver' in window) ||
        (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove('pre'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    var vh = window.innerHeight;
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh) { el.classList.add('pre'); io.observe(el); }
    });
  }

  /* ---------- Démarrage ---------- */
  renderServices();
  renderCare();
  renderProducts();
  renderFormulas();
  renderBrochures();
  buildIndex();
  watchSections();
  revealOnScroll();

  var loader = $('#loader');
  function hideLoader() {
    if (loader.classList.contains('done')) return;
    loader.classList.add('done');
    setTimeout(function () { loader.remove(); }, 400);
    var seen = false;
    try { seen = sessionStorage.getItem('csm-welcome') === '1'; sessionStorage.setItem('csm-welcome', '1'); } catch (e) {}
    if (!seen) setTimeout(function () { toast('Bienvenue à CAP SANTÉ MARISTES.'); }, 500);
  }
  if (document.readyState === 'complete') setTimeout(hideLoader, 250);
  else window.addEventListener('load', function () { setTimeout(hideLoader, 250); });
  setTimeout(hideLoader, 1500); /* jamais plus d'1,5 s d'attente */
})();
