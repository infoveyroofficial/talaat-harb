/* موقع تعليمي ثابت جاهز للنشر على GitHub Pages دون أدوات بناء */
(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const menu = $('#menuToggle');
  const nav = $('#mainNav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
    });
    $$('a', nav).forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('keydown', e => {if (e.key === 'Escape') {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
  }
  const progress = $('#readProgress');
  const portrait = $('#floatingPortrait');
  const popover = $('#portraitPopover');
  const up = $('#backToTop');
  let scheduled = false;
  const update = () => {
    const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const percent = Math.min(1,Math.max(0,window.scrollY/maximum));
    if (progress) progress.style.width = `${percent * 100}%`;
    if (up) up.classList.toggle('visible', window.scrollY > 480);
    if (portrait && window.innerWidth > 780) {
      const allowed = Math.max(0,window.innerHeight - 310);
      portrait.style.setProperty('--float-y', `${Math.round(percent * allowed)}px`);
      if (popover && !popover.hidden) {
        popover.style.top = `${Math.min(window.innerHeight-160,190 + Math.round(percent*allowed))}px`;
      }
    }
    scheduled = false;
  };
  window.addEventListener('scroll', () => {if (!scheduled){scheduled=true;requestAnimationFrame(update);}}, {passive:true});
  window.addEventListener('resize', update);
  update();
  if (up) up.addEventListener('click', () => window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'}));
  if (portrait && popover) {
    portrait.addEventListener('click', () => {
      const willOpen = popover.hidden;
      popover.hidden = !willOpen;
      portrait.setAttribute('aria-expanded',String(willOpen));
      update();
    });
    document.addEventListener('click', e => {
      if (!portrait.contains(e.target) && !popover.contains(e.target)) {
        popover.hidden = true;portrait.setAttribute('aria-expanded','false');
      }
    });
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}
      });
    },{threshold:.08,rootMargin:'0px 0px -25px 0px'});
    $$('.reveal').forEach(el => io.observe(el));
  } else {$$('.reveal').forEach(el => el.classList.add('is-visible'));}

  const essays = {
    one: {
      tag: 'المقال الأول · الاقتصاد والاستقلال',
      title: 'طلعت حرب: الرجل الذي حلم باستقلال مصر الاقتصادي',
      paragraphs: [
        'في أواخر القرن التاسع عشر وبداية القرن العشرين، كانت مصر تعيش تناقضًا لافتًا: تملك أرضًا خصبة وعمالًا مهرة وموارد مهمة، لكنها لم تكن تتحكم بالقدر الكافي في المؤسسات المالية التي تدير هذه الثروات. في هذه البيئة نشأ وعي طلعت حرب بأن استقلال البلاد لا يتحقق بالشعارات وحدها؛ بل يحتاج إلى اقتصاد يستطيع الاعتماد على موارده ومهارات أبنائه.',
        'لم يكن طلعت حرب صاحب فكرة عابرة. فقد جمع بين الخبرة العملية في الإدارة والشركات والتأمل في أوضاع الفلاحين والمنتجين. وعندما واجهت مصر أزمات مالية خلال العقد الأول من القرن العشرين، أدرك أن وجود مؤسسة تمويل وطنية قد يغيّر علاقة المصريين بأموالهم ومدخراتهم. عندئذ اتخذ من الكلمة والعمل وسيلتين للدعوة إلى فكرة البنك المصري.',
        'شرح أفكاره من خلال الكتابات الاقتصادية، ومن أشهرها كتابه عن علاج مصر الاقتصادي وإنشاء بنك للمصريين. كان يدعو إلى توجيه رأس المال المحلي نحو مشروعات منتجة، بدل أن يظل مجرد ودائع أو يُوجَّه بعيدًا عن حاجات البلاد. وقد واصل الدفاع عن هذه الرؤية رغم صعوبة الظروف السياسية والاقتصادية والحرب العالمية الأولى.',
        'أتاحت ثورة ١٩١٩ مناخًا أقوى للتعبير عن مطلب الاستقلال الوطني، فأصبحت فكرة امتلاك المصريين لمؤسسة مالية مصرية أقرب إلى التنفيذ. وفي مايو ١٩٢٠ ظهر بنك مصر إلى النور، لا باعتباره نهاية المشروع، بل بدايته. فقد صار البنك وسيلة لتمويل مشروعات أخرى تمتد من الصناعة إلى الخدمات والثقافة.',
        'تُظهر قصة طلعت حرب أن التحولات الكبيرة تبدأ حين تلتقي الفكرة بالمعرفة والثقة والعمل الجماعي. وربما كان أعظم ما تركه هو التأكيد أن الوطنية ليست إحساسًا فحسب، بل مسؤولية تُترجم إلى مؤسسات تعيش بعد أصحابها.'
      ]
    },
    two: {
      tag: 'المقال الثاني · بنك مصر',
      title: 'بنك مصر: كيف تحوّل حلم طلعت حرب إلى حقيقة؟',
      paragraphs: [
        'تخيل أنك تعيش في بلد يملك فيه الناس المال والقدرة على العمل، لكن القرارات الكبرى المتعلقة بالتمويل والاستثمار تُتخذ في مؤسسات لا يديرونها. هذا هو النوع من التحديات الذي جعل طلعت حرب مقتنعًا بالحاجة إلى بنك وطني. لم يكن الهدف مجرد وضع اسم مصر على واجهة مبنى؛ بل تغيير الطريقة التي تتحرك بها الأموال داخل الاقتصاد.',
        'ظل المشروع يتبلور على مدى سنوات. وقد ساعدته خبرته الإدارية والمالية في فهم دور البنوك في تمويل التجارة والصناعة، لكنه واجه مهمة أصعب من إعداد خطة اقتصادية: كان عليه أن يقنع الناس بأن يثقوا في مشروع جديد، وأن يسهموا فيه بأموالهم، وأن يروا في الادخار والاستثمار شكلًا من أشكال المشاركة في بناء الوطن.',
        'بعد سنوات من النقاش والتأجيل، ساعد المناخ الوطني الذي أعقب ثورة ١٩١٩ على تحقيق المشروع. أُعلن تأسيس بنك مصر يوم ٧ مايو ١٩٢٠، ليصبح رمزًا مهمًا لفكرة الاستثمار الوطني. ومنذ البداية، لم يتعامل طلعت حرب مع البنك باعتباره مؤسسة للإيداع والإقراض فقط، بل باعتباره قوة تستطيع إنشاء شركات وطنية جديدة.',
        'من هنا نشأت أهمية مجموعة شركات مصر: الطباعة والغزل والنسيج والنقل والتأمين والطيران والإنتاج السينمائي وغيرها. كان كل قطاع من هذه القطاعات يمثل فرصة للعمل والإنتاج واكتساب الخبرة. وعندما نتأمل تلك المشروعات اليوم، ندرك أن رؤية طلعت حرب كانت تقوم على الترابط بين المال والعمل والمعرفة.',
        'لم تخلُ التجربة من العقبات. فقد تعرض البنك لأزمة شديدة في أواخر الثلاثينيات، وانتهى الأمر باستقالة طلعت حرب من إدارته في ١٩٣٩. ومع ذلك، بقي البنك واستمرت الفكرة. وهذا درس مهم في تاريخ المؤسسات: النجاح الحقيقي لا يعني عدم التعثر، بل بناء شيء يستطيع الاستمرار وتجاوز الأزمات.'
      ]
    },
    three: {
      tag: 'المقال الثالث · الصناعة الوطنية',
      title: 'طلعت حرب وبناء الصناعة الوطنية المصرية',
      paragraphs: [
        'حين نتحدث عن النهضة الاقتصادية، قد نفكر أولًا في حجم المال أو أعداد المشروعات. لكن طلعت حرب نظر إلى ما هو أوسع من ذلك: كيف تتحول المواد الخام والمهارات البشرية إلى منتجات وخدمات مصرية؟ وكيف تصبح البلاد قادرة على خلق فرص عمل وقيمة مضافة داخل حدودها؟ لهذا ربط بين التمويل والصناعة في مشروع اقتصادي واحد.',
        'كانت مصر معروفة بإنتاج القطن، إلا أن تصدير المادة الخام لا يمنحها بالضرورة كامل العائد الذي يمكن تحقيقه من الغزل والنسيج والتصنيع. ساعد بنك مصر في تأسيس شركة مصر للغزل والنسيج بالمحلة الكبرى سنة ١٩٢٧، في خطوة تشير إلى أهمية إقامة المصانع إلى جانب الحقول. فالمصنع لا ينتج البضائع فقط؛ بل يوفر وظائف وخبرات وتقنيات ويخلق أنشطة اقتصادية متصلة به.',
        'لم تقف المشروعات عند النسيج. فقد امتدت أعمال بنك مصر وشركاته إلى الطباعة والتأمين والنقل والملاحة والطيران. وكان دخول بعض هذه المجالات جريئًا في زمن احتاجت فيه مصر إلى تطوير مهارات جديدة وبنية مؤسسية حديثة. وأظهرت تجربة مصر للطيران، التي تأسست سنة ١٩٣٢، أن الطموح الوطني قادر على الاقتراب من قطاعات كانت تبدو بعيدة وصعبة.',
        'أحد أكثر جوانب التجربة إثارة هو اهتمام طلعت حرب بالثقافة والسينما. فدعم صناعة السينما والطباعة لم يكن بعيدًا عن فكرته الأساسية؛ لأن الاقتصاد الحديث لا يقوم على المصانع التقليدية وحدها، بل يشمل مجالات الإبداع ونقل المعرفة وصناعة الصورة.',
        'يرتبط إرثه الصناعي اليوم بسؤال ما يزال مهمًا: كيف يستطيع المجتمع أن ينتقل من استهلاك ما ينتجه الآخرون إلى المشاركة في ابتكاره وتصنيعه؟ لم يكن طلعت حرب يملك إجابة سهلة لكل تحدٍّ، لكنه قدّم نموذجًا عمليًا للتفكير في الإنتاج الوطني بوصفه مشروعًا طويل الأمد.'
      ]
    },
    four: {
      tag: 'المقال الرابع · دروس للأجيال',
      title: 'لماذا لا يزال طلعت حرب مصدر إلهام للأجيال الجديدة؟',
      paragraphs: [
        'قد تبدو حياة طلعت حرب بعيدة عن عالم الطلاب والتقنية وريادة الأعمال الحديثة. فقد عاش قبل ظهور الإنترنت والهواتف الذكية بوقت طويل. لكن ما يجعله شخصية ملهمة حتى اليوم ليس الأدوات التي استخدمها، بل الطريقة التي فكر بها في المشكلات وكيف حاول تحويل الحلول إلى مشروعات حقيقية.',
        'أول درس يمكن تعلمه منه هو أن معرفة المشكلة تسبق محاولة حلها. لم يبدأ مشروعه من فكرة براقة فحسب؛ بل من سنوات عمل وخبرة في الإدارة والتجارة والاقتصاد. لقد رأى الصعوبات التي يعانيها الفلاحون والمستثمرون، وفهم حاجة السوق إلى تمويل مختلف. ويشبه ذلك ما يفعله صاحب مشروع ناجح اليوم عندما يدرس احتياجات الناس قبل بناء منتجه.',
        'والدرس الثاني هو الصبر. فعندما طرح فكرة البنك الوطني، لم تتحقق في اليوم التالي. احتاج الأمر إلى نقاشات وكتابات وإقناع وانتظار ظروف أكثر ملاءمة. وفي عصر نرغب فيه أحيانًا بالحصول على نتائج فورية، تذكّرنا تجربته بأن المشروعات الكبرى تحتاج إلى وقت ومثابرة وعمل منظم.',
        'أما الدرس الثالث فهو أهمية العمل الجماعي. لم ينشأ بنك مصر بإرادة شخص واحد فقط؛ بل بجهود مساهمين وشركاء وعاملين وثقوا بالمشروع. إن القيادة الحقيقية لا تعني أن يفعل القائد كل شيء بنفسه، بل أن يستطيع جمع الناس حول هدف واضح، ثم بناء مؤسسة تتجاوز وجوده الشخصي.',
        'وأخيرًا، تعلمنا قصته أن الطموح يمكن أن يكون شخصيًا ووطنيًا في الوقت نفسه. يستطيع الطالب اليوم أن يتعلم البرمجة أو الإدارة أو التصميم أو الهندسة، ثم يستخدم ما تعلمه في حل مشكلة حقيقية في مجتمعه. وهذه هي الرسالة الأعمق التي يبقى أثر طلعت حرب شاهدًا عليها: المعرفة والعمل يصنعان مستقبلًا أفضل.'
      ]
    }
  };
  const dialog = $('#essayDialog');
  if (dialog) {
    const title = $('#dialogTitle'), label = $('#dialogLabel'), content = $('#dialogContent'), close=$('#closeDialog');
    let previousTrigger = null;
    $$('.essay-open').forEach(btn => btn.addEventListener('click', () => {
      const essay = essays[btn.dataset.essay];
      if (!essay) return;
      previousTrigger = btn;
      title.textContent=essay.title;
      label.textContent=essay.tag;
      content.replaceChildren(...essay.paragraphs.map(paragraph => {
        const p=document.createElement('p'); p.textContent=paragraph; return p;
      }));
      if(typeof dialog.showModal === 'function') {dialog.showModal();}
      else {dialog.setAttribute('open','');}
      document.body.style.overflow='hidden';
      $('.essay-dialog-body').scrollTop=0;
    }));
    const closeModal = () => {if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open');};
    close.addEventListener('click',closeModal);
    dialog.addEventListener('click', e => {if(e.target===dialog)closeModal();});
    dialog.addEventListener('close', () => {document.body.style.overflow='';previousTrigger?.focus();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.open){closeModal();document.body.style.overflow='';}});
  }
})();
