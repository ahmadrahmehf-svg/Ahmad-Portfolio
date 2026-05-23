export type Language = 'en' | 'ar';

export const portfolioContent = {
  en: {
    brand: {
      name: 'Ahmad Rahmeh',
    },
    nav: {
      links: [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Education', href: '#education' },
        { label: 'Skills', href: '#skills' },
        { label: 'Certifications', href: '#certifications' },
        { label: 'Contact', href: '#contact' },
      ],
      switchLabel: 'Switch language',
      languageNames: {
        en: 'English',
        ar: 'Arabic',
      },
    },
    hero: {
      available: 'Available',
      firstName: 'Ahmad',
      lastName: 'Rahmeh',
      title: 'Project & Technical Management Professional',
      tagline:
        'Bridging technical expertise in solar energy systems with strong project management, budget control, and team coordination skills.',
      quickLinks: [
        { label: 'Phone', text: '+962797536891', href: 'tel:+962797536891' },
        { label: 'Email', text: 'ahmedrahmeh@yahoo.com', href: 'mailto:ahmedrahmeh@yahoo.com' },
        { label: 'Location', text: 'Amman, Jordan', href: '#' },
      ],
      primaryCta: 'Get In Touch',
      secondaryCta: 'View Experience',
      downloadCta: 'Download PDF',
      downloadingCta: 'Preparing PDF...',
      photoAlt: 'Ahmad Rahmeh',
    },
    about: {
      eyebrow: 'Professional Profile',
      title: 'About Me',
      summary: [
        'A dedicated Project & Technical Management Professional with extensive experience in the energy and solar sector. Proven ability to lead cross-functional teams, manage budgets, and deliver complex technical projects on time.',
        'Combining a strong technical background in solar power systems and electrical engineering with solid project management skills. Experienced in coordinating between technical teams and management, preparing detailed reports, and ensuring smooth project execution.',
      ],
      highlights: [
        { label: '5+ Years Experience', value: 'Project Management' },
        { label: 'Solar & Energy', value: 'Technical Expertise' },
        { label: 'Team Leadership', value: 'Coordination Skills' },
        { label: 'Budget Control', value: 'Financial Oversight' },
      ],
      strengthsTitle: 'Key Strengths',
      strengths: [
        'Strategic Project Planning',
        'Technical Documentation',
        'Solar & Electrical Systems',
        'Team Coordination & Leadership',
        'Budget Control & Reporting',
        'Renewable Energy Expertise',
      ],
      languagesTitle: 'Languages',
      languages: [
        { name: 'Arabic', level: 'Native' },
        { name: 'English', level: 'Fluent' },
      ],
    },
    experience: {
      eyebrow: 'Career Journey',
      title: 'Professional Experience',
      items: [
        {
          title: 'Project Designer',
          company: 'Future Energy Project Development Co.',
          location: 'Amman, Jordan',
          period: 'June 2014 - June 2017',
          responsibilities: [
            'Prepared project drawings, layouts, and design documentation',
            'Supported technical design work for energy and infrastructure projects',
            'Developed design concepts based on project requirements and site needs',
            'Collaborated with engineers, project teams, and stakeholders during design phases',
            'Coordinated revisions and technical feedback to improve project deliverables',
            'Assisted with quantity estimation and design-related cost considerations',
          ],
        },
        {
          title: 'PV Solar Technician',
          company: 'New Village of Energy (NVEco)',
          location: 'Amman, Jordan',
          period: 'October 2017 - October 2018',
          responsibilities: [
            'Worked on PV solar energy systems and renewable energy projects',
            'Provided installation support, field supervision, and technical assistance',
            'Assisted with solar panel system setup, testing, and commissioning',
            'Performed troubleshooting, inspections, and preventive maintenance tasks',
            'Coordinated with site teams to ensure safe and efficient execution of work',
            'Prepared technical notes and reported field progress to supervisors',
          ],
        },
        {
          title: 'Project / Technical Management Role',
          company: 'Future Energy Project Development Co.',
          location: 'Amman, Jordan',
          period: '2018 - Present',
          responsibilities: [
            'Managed project coordination and execution from planning to delivery',
            'Assisted in budgeting, cost control, and financial tracking',
            'Coordinated between technical teams and management stakeholders',
            'Supported project planning, scheduling, and progress reporting',
            'Oversaw operational and technical activities on-site',
            'Facilitated communication with clients, suppliers, and partners',
          ],
        },
      ],
    },
    education: {
      eyebrow: 'Academic Background',
      title: 'Education',
      graduatedLabel: 'Graduated',
      items: [
        {
          institution: 'Arab Community College',
          degree: 'Training Diploma',
          specialization: 'Electrical Wiring & Solar Power Engineering',
          date: 'June 2016',
          details: ['Electrical Wiring Systems', 'Solar Power Engineering'],
        },
        {
          institution: 'Al Saad International School',
          degree: 'High School Diploma',
          specialization: 'General Education',
          date: 'June 2008',
          details: ['Science Track', 'Mathematics & Physics'],
        },
      ],
    },
    skills: {
      eyebrow: 'Expertise & Abilities',
      title: 'Core Skills',
      categories: [
        {
          title: 'Project Management',
          skills: [
            { name: 'Project Management', level: 90 },
            { name: 'Budget Control', level: 85 },
            { name: 'Team Coordination', level: 90 },
            { name: 'Project Planning', level: 85 },
            { name: 'Reporting', level: 80 },
            { name: 'Technical Supervision', level: 85 },
          ],
        },
        {
          title: 'Technical Skills',
          skills: [
            { name: 'Solar Power Systems', level: 90 },
            { name: 'Electrical Wiring', level: 85 },
            { name: 'Industrial Control', level: 75 },
            { name: 'AutoCAD', level: 70 },
          ],
        },
        {
          title: 'Computer Skills',
          skills: [
            { name: 'Microsoft Office', level: 90 },
            { name: 'Computer Systems', level: 85 },
            { name: 'Technical Documentation', level: 85 },
          ],
        },
      ],
    },
    certifications: {
      eyebrow: 'Professional Development',
      title: 'Certifications & Training',
      items: [
        {
          title: 'Industrial Control Course',
          description: 'Comprehensive training in industrial control systems and automation',
          badge: '30 Hours',
          details: ['PLC Systems', 'Control Panels', 'Automation'],
        },
        {
          title: 'Technical and Electrical Systems Training',
          description: 'Professional training in electrical systems design and implementation',
          badge: 'Certified',
          details: ['Circuit Design', 'Electrical Safety', 'System Integration'],
        },
        {
          title: 'Solar Energy Systems Training',
          description: 'Specialized training in solar energy system design and installation',
          badge: 'Certified',
          details: ['PV Systems', 'Energy Storage', 'System Sizing'],
        },
      ],
    },
    interests: {
      eyebrow: 'Personal',
      title: 'Interests & Hobbies',
      items: [
        {
          title: 'Technology & Gadgets',
          description: 'Passionate about the latest technological innovations and smart devices',
        },
        {
          title: 'Computer Systems',
          description: 'Enthusiast about computer architecture, networking, and system optimization',
        },
      ],
    },
    contact: {
      eyebrow: "Let's Connect",
      title: 'Get In Touch',
      intro:
        "Interested in working together? Feel free to reach out. I'm always open to discussing new opportunities and projects.",
      info: [
        { label: 'Phone', value: '+962797536891', href: 'tel:+962797536891' },
        { label: 'Email', value: 'ahmedrahmeh@yahoo.com', href: 'mailto:ahmedrahmeh@yahoo.com' },
        { label: 'Location', value: 'Amman, Jordan', href: '#' },
        { label: 'Availability', value: 'Open to opportunities', href: '#' },
      ],
      socialTitle: 'Connect With Me',
      successTitle: 'Message Sent!',
      successDescription: "Thank you for reaching out. I'll get back to you shortly.",
      form: {
        nameLabel: 'Your Name',
        namePlaceholder: 'John Doe',
        emailLabel: 'Email Address',
        emailPlaceholder: 'john@example.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your project or opportunity...',
        submit: 'Send Message',
      },
    },
    footer: {
      builtWith: 'Built with',
      location: 'Amman, Jordan',
      backToTop: 'Back to top',
    },
  },
  ar: {
    brand: {
      name: 'أحمد رحمة',
    },
    nav: {
      links: [
        { label: 'الرئيسية', href: '#home' },
        { label: 'من أنا', href: '#about' },
        { label: 'الخبرات', href: '#experience' },
        { label: 'التعليم', href: '#education' },
        { label: 'المهارات', href: '#skills' },
        { label: 'الشهادات', href: '#certifications' },
        { label: 'التواصل', href: '#contact' },
      ],
      switchLabel: 'تبديل اللغة',
      languageNames: {
        en: 'الإنجليزية',
        ar: 'العربية',
      },
    },
    hero: {
      available: 'متاح',
      firstName: 'أحمد',
      lastName: 'رحمة',
      title: 'متخصص في إدارة المشاريع والإدارة الفنية',
      tagline:
        'أجمع بين الخبرة الفنية في أنظمة الطاقة الشمسية ومهارات قوية في إدارة المشاريع وضبط الميزانيات وتنسيق فرق العمل.',
      quickLinks: [
        { label: 'الهاتف', text: '+962797536891', href: 'tel:+962797536891' },
        { label: 'البريد الإلكتروني', text: 'ahmedrahmeh@yahoo.com', href: 'mailto:ahmedrahmeh@yahoo.com' },
        { label: 'الموقع', text: 'عمان، الأردن', href: '#' },
      ],
      primaryCta: 'تواصل معي',
      secondaryCta: 'عرض الخبرات',
      downloadCta: 'تحميل PDF',
      downloadingCta: 'جارٍ تجهيز PDF...',
      photoAlt: 'أحمد رحمة',
    },
    about: {
      eyebrow: 'الملف المهني',
      title: 'نبذة عني',
      summary: [
        'متخصص ملتزم في إدارة المشاريع والإدارة الفنية، ويتمتع بخبرة واسعة في قطاع الطاقة والطاقة الشمسية. أمتلك قدرة مثبتة على قيادة الفرق متعددة التخصصات وإدارة الميزانيات وتسليم المشاريع الفنية المعقدة في الوقت المحدد.',
        'أجمع بين خلفية تقنية قوية في أنظمة الطاقة الشمسية والهندسة الكهربائية وبين مهارات راسخة في إدارة المشاريع. لدي خبرة في التنسيق بين الفرق الفنية والإدارة، وإعداد التقارير التفصيلية، وضمان تنفيذ المشاريع بسلاسة وكفاءة.',
      ],
      highlights: [
        { label: 'أكثر من 5 سنوات خبرة', value: 'إدارة المشاريع' },
        { label: 'الطاقة والطاقة الشمسية', value: 'خبرة فنية' },
        { label: 'قيادة الفرق', value: 'مهارات تنسيق' },
        { label: 'ضبط الميزانية', value: 'إشراف مالي' },
      ],
      strengthsTitle: 'نقاط القوة الأساسية',
      strengths: [
        'التخطيط الاستراتيجي للمشاريع',
        'التوثيق الفني',
        'الأنظمة الشمسية والكهربائية',
        'تنسيق الفرق والقيادة',
        'ضبط الميزانية وإعداد التقارير',
        'خبرة في الطاقة المتجددة',
      ],
      languagesTitle: 'اللغات',
      languages: [
        { name: 'العربية', level: 'اللغة الأم' },
        { name: 'الإنجليزية', level: 'بطلاقة' },
      ],
    },
    experience: {
      eyebrow: 'المسيرة المهنية',
      title: 'الخبرات العملية',
      items: [
        {
          title: 'مصمم مشاريع',
          company: 'Future Energy Project Development Co.',
          location: 'عمان، الأردن',
          period: 'يونيو 2014 - يونيو 2017',
          responsibilities: [
            'أعددت الرسومات والمخططات ووثائق التصميم الخاصة بالمشاريع',
            'دعمت أعمال التصميم الفني لمشاريع الطاقة والبنية التحتية',
            'طورت مفاهيم التصميم بناء على متطلبات المشروع واحتياجات الموقع',
            'تعاونت مع المهندسين وفرق المشاريع وأصحاب المصلحة خلال مراحل التصميم',
            'نسقت التعديلات والملاحظات الفنية لتحسين مخرجات المشروع',
            'ساهمت في حصر الكميات ومراعاة الجوانب المرتبطة بتكلفة التصميم',
          ],
        },
        {
          title: 'فني طاقة شمسية كهروضوئية',
          company: 'New Village of Energy (NVEco)',
          location: 'عمان، الأردن',
          period: 'أكتوبر 2017 - أكتوبر 2018',
          responsibilities: [
            'عملت على أنظمة الطاقة الشمسية الكهروضوئية ومشاريع الطاقة المتجددة',
            'قدمت دعما في التركيب والإشراف الميداني والمساندة الفنية',
            'ساعدت في تركيب أنظمة الألواح الشمسية واختبارها وتشغيلها',
            'نفذت أعمال التشخيص والفحص والصيانة الوقائية',
            'نسقت مع فرق المواقع لضمان تنفيذ العمل بكفاءة وأمان',
            'أعددت الملاحظات الفنية ورفعت تقارير التقدم الميداني للمشرفين',
          ],
        },
        {
          title: 'إدارة المشاريع والإدارة الفنية',
          company: 'Future Energy Project Development Co.',
          location: 'عمان، الأردن',
          period: '2018 - حتى الآن',
          responsibilities: [
            'أدرت تنسيق المشاريع وتنفيذها من مرحلة التخطيط حتى التسليم',
            'ساهمت في إعداد الميزانيات وضبط التكاليف والمتابعة المالية',
            'نسقت بين الفرق الفنية والإدارة وأصحاب المصلحة',
            'دعمت تخطيط المشاريع وجدولتها وإعداد تقارير التقدم',
            'أشرفت على الأنشطة التشغيلية والفنية في الموقع',
            'سهلت التواصل مع العملاء والموردين والشركاء',
          ],
        },
      ],
    },
    education: {
      eyebrow: 'الخلفية الأكاديمية',
      title: 'التعليم',
      graduatedLabel: 'تاريخ التخرج',
      items: [
        {
          institution: 'كلية المجتمع العربي',
          degree: 'دبلوم تدريبي',
          specialization: 'التمديدات الكهربائية وهندسة الطاقة الشمسية',
          date: 'يونيو 2016',
          details: ['أنظمة التمديدات الكهربائية', 'هندسة الطاقة الشمسية'],
        },
        {
          institution: 'مدرسة السعد العالمية',
          degree: 'شهادة الثانوية العامة',
          specialization: 'التعليم العام',
          date: 'يونيو 2008',
          details: ['المسار العلمي', 'الرياضيات والفيزياء'],
        },
      ],
    },
    skills: {
      eyebrow: 'الخبرات والقدرات',
      title: 'المهارات الأساسية',
      categories: [
        {
          title: 'إدارة المشاريع',
          skills: [
            { name: 'إدارة المشاريع', level: 90 },
            { name: 'ضبط الميزانية', level: 85 },
            { name: 'تنسيق الفرق', level: 90 },
            { name: 'تخطيط المشاريع', level: 85 },
            { name: 'إعداد التقارير', level: 80 },
            { name: 'الإشراف الفني', level: 85 },
          ],
        },
        {
          title: 'المهارات الفنية',
          skills: [
            { name: 'أنظمة الطاقة الشمسية', level: 90 },
            { name: 'التمديدات الكهربائية', level: 85 },
            { name: 'التحكم الصناعي', level: 75 },
            { name: 'أوتوكاد', level: 70 },
          ],
        },
        {
          title: 'المهارات الحاسوبية',
          skills: [
            { name: 'مايكروسوفت أوفيس', level: 90 },
            { name: 'أنظمة الحاسوب', level: 85 },
            { name: 'التوثيق الفني', level: 85 },
          ],
        },
      ],
    },
    certifications: {
      eyebrow: 'التطوير المهني',
      title: 'الشهادات والدورات',
      items: [
        {
          title: 'دورة التحكم الصناعي',
          description: 'تدريب شامل في أنظمة التحكم الصناعي والأتمتة',
          badge: '30 ساعة',
          details: ['أنظمة PLC', 'لوحات التحكم', 'الأتمتة'],
        },
        {
          title: 'تدريب الأنظمة الفنية والكهربائية',
          description: 'تدريب مهني في تصميم الأنظمة الكهربائية وتنفيذها',
          badge: 'معتمد',
          details: ['تصميم الدوائر', 'السلامة الكهربائية', 'تكامل الأنظمة'],
        },
        {
          title: 'تدريب أنظمة الطاقة الشمسية',
          description: 'تدريب متخصص في تصميم وتركيب أنظمة الطاقة الشمسية',
          badge: 'معتمد',
          details: ['أنظمة PV', 'تخزين الطاقة', 'تحديد سعة النظام'],
        },
      ],
    },
    interests: {
      eyebrow: 'شخصي',
      title: 'الاهتمامات والهوايات',
      items: [
        {
          title: 'التقنية والأجهزة الذكية',
          description: 'شغوف بأحدث الابتكارات التقنية والأجهزة الذكية',
        },
        {
          title: 'أنظمة الحاسوب',
          description: 'مهتم بهيكلية الحاسوب والشبكات وتحسين أداء الأنظمة',
        },
      ],
    },
    contact: {
      eyebrow: 'لنتواصل',
      title: 'تواصل معي',
      intro:
        'إذا كنت مهتما بالعمل معا، فلا تتردد في التواصل. أنا دائما منفتح على مناقشة الفرص والمشاريع الجديدة.',
      info: [
        { label: 'الهاتف', value: '+962797536891', href: 'tel:+962797536891' },
        { label: 'البريد الإلكتروني', value: 'ahmedrahmeh@yahoo.com', href: 'mailto:ahmedrahmeh@yahoo.com' },
        { label: 'الموقع', value: 'عمان، الأردن', href: '#' },
        { label: 'التوفر', value: 'منفتح على الفرص', href: '#' },
      ],
      socialTitle: 'تواصل معي',
      successTitle: 'تم إرسال الرسالة',
      successDescription: 'شكرا لتواصلك. سأعود إليك في أقرب وقت ممكن.',
      form: {
        nameLabel: 'الاسم',
        namePlaceholder: 'اكتب اسمك',
        emailLabel: 'البريد الإلكتروني',
        emailPlaceholder: 'example@email.com',
        messageLabel: 'الرسالة',
        messagePlaceholder: 'أخبرني عن مشروعك أو الفرصة المتاحة...',
        submit: 'إرسال الرسالة',
      },
    },
    footer: {
      builtWith: 'صُمم بكل حب',
      location: 'عمان، الأردن',
      backToTop: 'العودة إلى الأعلى',
    },
  },
} as const;

export type PortfolioContent = (typeof portfolioContent)[Language];
