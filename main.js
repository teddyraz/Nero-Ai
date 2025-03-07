document.getElementById('sendButton')
  .addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (messageText !== '') {
      // User message (left side)
      const messageElement = document.createElement('div');
      messageElement.className = 'bg-blue-500 text-white p-2 rounded-lg self-start w-fit ml-2';
      messageElement.textContent = messageText;
      document.getElementById('messages').appendChild(messageElement);
      messageInput.value = '';
      
      // Chatbot response
      setTimeout(() => {
        const responseText = getBotResponse(messageText);
        const responseElement = document.createElement('div');
        responseElement.className = 'bg-gray-700 text-white p-2 rounded-lg self-end w-fit mr-2';
        responseElement.textContent = responseText;
        document.getElementById('messages').appendChild(responseElement);
      }, 500); // 500ms delay
    }
  });

// Function to handle chatbot responses
function getBotResponse(userMessage) {
  const responses = {
    "hello": ["Hey there! 😊", "Hello! How can I help you? 👋", "Hi! Hope you're having a great day! 🌟"],
    "how are you": ["I'm good! How about you? 😊", "Doing great! What about you? 😃", "Feeling awesome! Thanks for asking! 🎉"],
    "what's your name": ["I'm your friendly chatbot! 🤖", "Just call me ChatBuddy! 😃", "I'm here to chat with you! 🙌"],
    "tell me a joke": [
      "Why don't skeletons fight each other? Because they don't have the guts! 😂",
      "Why did the math book look sad? Because it had too many problems! 📖😂",
      "I'm reading a book about anti-gravity. It's impossible to put down! 😆"
    ],
    "bye": ["Goodbye! Have a great day! 👋", "See you soon! Take care! 😊", "Bye! It was nice chatting with you! 🎉"],
    "hi": ["How I Can Help You?"],
    "hello": ["Hey there! 😊", "Hello! How can I assist you today? 👋", "Hi! How can we help with your project? 🚀"],
    "hi": ["Hi there! 😊", "Hey! What’s up? 🚀", "Hello! Hope you’re doing well! 🌞"],
    "what services do you offer": ["We offer web, mobile app, and software development services. 💻", "We build websites, apps, and AI solutions. 🚀"],
    "do you develop mobile apps": ["Yes, we create Android & iOS apps using Flutter & React Native. 📱", "Absolutely! We specialize in high-performance mobile apps. 🚀"],
    "do you develop websites": ["Yes, we build custom websites, e-commerce platforms, and web applications. 🌍", "We create modern, responsive, and SEO-friendly websites. 💡"],
    "how much does a website cost": ["Website cost depends on features. Basic sites start at $500. 💰", "Prices vary; let’s discuss your project for an exact quote. 📞"],
    "how much does an app cost": ["Mobile app costs start from $1000, based on complexity. 📱", "Let’s talk about your app idea for a custom estimate. 💡"],
    "how long does it take to build an app": ["A simple app takes 4-8 weeks, advanced ones take 3-6 months. 🚀", "It depends on features & complexity. Let’s discuss. 📞"],
    "do you offer maintenance": ["Yes! We provide post-launch support, bug fixes, and updates. 🛠️", "Absolutely! We ensure your software runs smoothly. 🔥"],
    "can you redesign my website": ["Yes! We can improve the UI/UX & performance of your website. 🎨", "A fresh redesign can boost conversions. Let’s talk! 🚀"],
    "what technologies do you use": ["We use React, Angular, Node.js, Laravel, Flutter, and more. 💻", "Our tech stack includes Python, JavaScript, AWS, and AI. ☁️"],
    "do you provide hosting": ["Yes! We offer managed hosting on AWS, DigitalOcean, and more. ☁️", "We ensure reliable, fast, and secure hosting. 🔥"],
    "do you integrate payment gateways": ["Yes! We integrate Stripe, PayPal, Razorpay, and more. 💳", "We enable seamless payment solutions for your business. 💰"],
    "can you develop an e-commerce site": ["Yes! We build e-commerce platforms with Shopify, WooCommerce, & custom solutions. 🛍️", "We create scalable online stores with secure payments. 🚀"],
    "do you create chatbots": ["Yes! We develop AI-powered chatbots for WhatsApp, websites, & customer support. 🤖", "Chatbots can automate your business. Let’s discuss! 😊"],
    "do you work with startups": ["Yes! We love helping startups turn ideas into reality. 🚀", "We provide MVP development & funding assistance. 💡"],
    "how do I hire you": ["Just contact us with your project details, and we’ll guide you. 📞", "Hiring us is easy! Let’s set up a meeting. 😊"],
    "do you sign NDAs": ["Yes! We respect confidentiality and sign NDAs for sensitive projects. 🔒", "We ensure your ideas stay protected. Let’s discuss. 📜"],
    "can you provide a free consultation": ["Yes! Let’s have a free call to explore your requirements. 📞", "Absolutely! A quick consultation can help plan your project. 💡"],
    "what industries do you work with": ["We work with e-commerce, healthcare, fintech, education, and more. 🚀", "Our expertise spans multiple industries. Let’s talk! 🔥"],
    "do you build SaaS applications": ["Yes! We specialize in SaaS app development and cloud-based platforms. ☁️", "We create scalable SaaS products tailored for businesses. 😊"],
    "do you develop ERP software": ["Yes, we build custom ERP solutions for businesses. 💼", "Our ERP systems help automate and optimize workflows. 🚀"],
    "do you offer UI/UX design": ["Yes! We create stunning and user-friendly UI/UX designs. 🎨", "Good design improves engagement. Let’s revamp your UI! 💡"],
    "do you work with blockchain technology": ["Yes, we build blockchain apps and smart contracts. 🔗", "We develop secure & decentralized blockchain solutions. 🚀"],
    "can you integrate AI into my app": ["Absolutely! We build AI-powered apps for automation. 🤖", "AI integration can enhance user experience and efficiency. 💡"],
    "do you offer cloud solutions": ["Yes! We deploy apps on AWS, Google Cloud, and Azure. ☁️", "Cloud solutions ensure scalability and security. 🚀"],
    "what is your pricing model": ["We offer fixed-price, hourly, and retainer models. 💰", "Pricing depends on project scope. Let’s discuss. 📞"],
    "do you provide API development": ["Yes, we create secure and scalable APIs. 🔗", "We offer RESTful and GraphQL API development. 💡"],
    "do you offer cybersecurity solutions": ["Yes! We provide app security, encryption, and audits. 🔒", "Cybersecurity is crucial; we help keep your data safe. 🚀"],
    "can you fix bugs in my software": ["Yes! We debug and optimize existing software. 🛠️", "We ensure smooth performance by resolving errors. 🔥"],
    "can you migrate my old website": ["Yes! We migrate websites to modern platforms. 🚀", "Website migration improves performance & security. 💡"],
    "do you support multi-language apps": ["Yes! We build multilingual websites & apps. 🌍", "Reach a global audience with multi-language support. 😊"],
    "do you offer AI-powered analytics": ["Yes! AI-driven insights help make data-based decisions. 📊", "We integrate AI for predictive analytics. 🔥"],
    "do you build CRM software": ["Yes! We develop customized CRM systems for businesses. 💼", "Our CRM solutions help manage customers effectively. 🚀"],
    "how do you ensure data security": ["We follow best security practices like encryption & firewalls. 🔒", "Data protection is our top priority. Let’s discuss. 💡"],
    "can you optimize my website for SEO": ["Yes! We improve page speed, structure, and keywords for SEO. 🚀", "SEO optimization boosts rankings and traffic. 😊"],
    "do you provide white-label solutions": ["Yes! We offer white-label software development. 💻", "We create branded solutions for your business. 🔥"],
    "how do you handle project management": ["We use Agile methodology and tools like Jira & Trello. 📊", "Project tracking ensures timely delivery. 🚀"],
    "do you work with enterprises": ["Yes! We build scalable solutions for large businesses. 💼", "We have experience with enterprise software development. ☺️"],
    "can you build a custom CMS": ["Yes! We develop custom CMS tailored to your needs. 💡", "We create CMS solutions for easy content management. 🚀"],
    "do you offer white-label apps": ["Yes! We develop white-label mobile and web apps. 📱", "White-label solutions can be branded as your own. 💡"],
    "can you automate my business processes": ["Yes! We build automation solutions using AI and RPA. 🔥", "Automation can save time and reduce errors. Let’s discuss! 🚀"],
    "do you support real-time applications": ["Yes! We use WebSockets & Firebase for real-time features. 🔄", "We develop live chat, notifications, and real-time dashboards. 📊"],
    "can you develop a marketplace app": ["Yes! We create B2B & B2C marketplace platforms. 🛍️", "Multi-vendor marketplaces require a strong backend. Let’s build one! 🚀"],
    "do you provide digital transformation services": ["Yes! We help businesses upgrade to modern tech. 🔥", "Digital transformation can boost productivity & revenue. 💡"],
    "how do you handle performance optimization": ["We use caching, CDNs, and efficient coding to optimize. ⚡", "Optimized performance improves speed & user experience. 🚀"],
    "do you provide DevOps services": ["Yes! We offer CI/CD, Kubernetes, and cloud automation. ☁️", "DevOps improves deployment speed and reliability. 🚀"],
    "can you integrate third-party APIs": ["Yes! We integrate payment, social, and custom APIs. 🔗", "API integration enhances functionality & efficiency. 💡"],
    "do you offer accessibility-focused development": ["Yes! We create ADA/WCAG-compliant applications. ♿", "Inclusive design ensures accessibility for everyone. 🌍"],
    "how do you ensure cross-platform compatibility": ["We use responsive design and testing across devices. 📱💻", "Cross-platform support improves user reach & performance. 🚀"],
    "do you offer cloud migration": ["Yes! We migrate apps to AWS, Azure, and GCP. ☁️", "Cloud migration improves scalability & security. 🔒"],
    "do you develop IoT applications": ["Yes! We build IoT solutions for smart devices. 📡", "IoT apps can connect and control devices remotely. 🚀"],
    "can you build a fintech app": ["Yes! We develop secure fintech & banking apps. 💳", "We offer PCI-compliant solutions for finance businesses. 🔥"],
    "do you provide AR/VR development": ["Yes! We create Augmented & Virtual Reality applications. 🕶️", "AR/VR enhances user experience in gaming & business. 🚀"],
    "can you develop hybrid apps": ["Yes! We build hybrid apps using React Native & Flutter. 📱", "Hybrid apps work across iOS and Android platforms. 💡"],
    "do you offer MVP development": ["Yes! We help startups launch MVPs quickly. 🚀", "MVP development focuses on core features first. 💡"],
    "how do you handle database management": ["We use MySQL, PostgreSQL, and NoSQL solutions. 📊", "Efficient databases ensure high performance & security. 🔒"],
    "can you build an on-demand service app": ["Yes! We create Uber-like on-demand service apps. 🚀", "On-demand apps need real-time tracking & secure payments. 💡"],
    "do you provide bug tracking services": ["Yes! We use tools like Jira & Sentry for bug tracking. 🛠️", "We ensure all issues are fixed before launch. 🔥"],
    "how do you handle security testing": ["We perform penetration testing and security audits. 🔒", "Cybersecurity measures protect against vulnerabilities. 🚀"],
    "do you provide SaaS migration": ["Yes! We migrate traditional apps to SaaS platforms. ☁️", "SaaS migration improves accessibility & scalability. 🔥"],
    "can you build an AI chatbot": ["Yes! We develop AI chatbots with NLP & machine learning. 🤖", "Chatbots improve customer engagement & automation. 💡"],
    "do you offer blockchain-based applications": ["Yes! We build DApps and smart contracts. 🔗", "Blockchain ensures transparency and security. 🚀"],
    "can you develop a learning management system (LMS)": ["Yes! We create LMS platforms for online education. 📚", "E-learning solutions are in high demand. Let’s build one! 💡"],
    "do you provide progressive web apps (PWA)": ["Yes! PWAs offer fast, app-like experiences on the web. 🔥", "PWAs work offline and improve user engagement. 🚀"],
    "can you create a subscription-based platform": ["Yes! We build SaaS platforms with subscription models. 💰", "Subscriptions generate recurring revenue for businesses. 🔄"],
    "do you offer remote development teams": ["Yes! We provide dedicated remote developers. 💻", "Hire expert developers for your projects remotely. 🌍"],
    "can you integrate AI-powered analytics": ["Yes! AI-driven insights improve business decisions. 📊", "Data analytics helps in predictive analysis & reporting. 🚀"],
    "do you provide UI component libraries": ["Yes! We create reusable UI libraries for development teams. 🎨", "Component-based development speeds up UI building. 🔥"],
    "can you build social media apps": ["Yes! We create feature-rich social media platforms. 📱", "Social apps require real-time engagement features. 🚀"],
    "do you offer Agile development": ["Yes! We follow Agile methodologies for fast iterations. ⚡", "Agile ensures continuous improvement & collaboration. 💡"],
    "how do you ensure UX research": ["We conduct A/B testing and user interviews. 🔍", "User feedback helps refine UX & usability. 🚀"],
    "do you provide interactive dashboards": ["Yes! We build real-time analytics dashboards. 📊", "Dashboards improve data visualization & decision-making. 🔥"],
    "how do you handle version control": ["We use Git, GitHub, and Bitbucket for version control. 🔄", "Version control ensures smooth team collaboration. 🚀"],
    "can you automate my workflow": ["Yes! We create workflow automation solutions. 🔄", "Automation reduces manual tasks and boosts productivity. 🚀"],
    "do you develop peer-to-peer platforms": ["Yes! We build secure P2P marketplaces and apps. 🔗", "P2P platforms connect users directly for services. 💰"],
    "can you provide real-time data streaming solutions": ["Yes! We develop event-driven real-time solutions. 📡", "Streaming data ensures instant updates & insights. 🚀"],
    "do you build enterprise mobile applications": ["Yes! We create secure enterprise mobile apps. 📱", "Enterprise apps improve business efficiency. 💼"],
    "can you integrate machine learning models": ["Yes! We embed ML models into software & apps. 🤖", "ML integration enhances data-driven applications. 💡"],
    "do you provide business intelligence solutions": ["Yes! We develop BI dashboards & reporting tools. 📊", "BI tools help in making data-driven decisions. 🚀"],
    "can you develop an HR management system": ["Yes! We build HRMS for workforce management. 💼", "HR software automates payroll, attendance, and more. 🔥"],
    "do you create interactive voice assistants": ["Yes! We develop AI-powered voice assistants. 🎙️", "Voice AI improves user accessibility & engagement. 🚀"],
    "can you integrate smart home automation": ["Yes! We build IoT-driven smart home apps. 🏡", "Home automation apps enhance device connectivity. 🔗"],
    "how do you handle GDPR compliance": ["We follow GDPR regulations for data privacy. 🔒", "Compliance ensures security and trust in applications. 🚀"],
    "what does your agency do": ["We develop websites, mobile apps, and custom software. 🚀", "We provide full-stack development services. 💻"],
    "how can you help my business": ["We create tech solutions to automate and grow your business. 📈", "Our custom software enhances productivity. 🔥"],
    "do you build websites and web apps": ["Yes! We build modern, responsive websites and web applications. 🌍", "We specialize in high-performance web solutions. 🚀"],
    "do you develop mobile apps": ["Yes! We create Android, iOS, and cross-platform apps. 📱", "We develop high-quality mobile apps using Flutter & React Native. 💡"],
    "how much does a website cost": ["Website pricing depends on features. Basic websites start at $500. 💰", "Let’s discuss your needs for an exact quote. 📞"],
    "how much does a mobile app cost": ["App pricing starts at $1000 and depends on complexity. 📱", "Let’s talk about your app idea for a custom quote. 💡"],
    "how long does it take to build a website": ["Simple websites take 2-4 weeks; complex ones take longer. 🚀", "It depends on features and design requirements. 😊"],
    "how long does it take to develop an app": ["Basic apps take 4-8 weeks; advanced apps take 3-6 months. 📱", "Development time depends on complexity & features. 🚀"],
    "do you offer free consultation": ["Yes! We offer a free consultation to discuss your project. 📞", "Absolutely! Let’s set up a free call to explore your idea. 💡"],
    "do you provide UI/UX design": ["Yes! We create modern, user-friendly UI/UX designs. 🎨", "A great UI/UX design improves user engagement. 🚀"],
    "do you provide website maintenance": ["Yes! We offer support, updates, and bug fixes. 🛠️", "Our maintenance plans keep your website running smoothly. 💡"],
    "do you provide app maintenance": ["Yes! We provide ongoing support and feature updates. 🚀", "Regular maintenance ensures security and performance. 🔥"],
    "what technologies do you use": ["We use React, Node.js, Python, Flutter, and more. 💻", "Our tech stack includes AWS, Laravel, AI, and blockchain. 🚀"],
    "do you integrate payment gateways": ["Yes! We integrate PayPal, Stripe, Razorpay, and more. 💳", "Secure online payments are essential for e-commerce. 💡"],
    "do you build e-commerce websites": ["Yes! We develop e-commerce platforms with secure payments. 🛍️", "We create online stores using Shopify, WooCommerce & custom solutions. 🚀"],
    "do you offer SEO services": ["Yes! We optimize websites for better search rankings. 🔍", "SEO improves visibility and drives traffic. 🚀"],
    "do you work with startups": ["Yes! We help startups with MVP development & scaling. 🚀", "We offer cost-effective solutions for new businesses. 💡"],
    "how do I hire your team": ["Simply contact us, and we’ll guide you through the process. 📞", "Let’s set up a meeting to discuss your needs. 😊"],
    "do you sign NDAs": ["Yes! We respect confidentiality and sign NDAs. 🔒", "Your ideas are safe with us! Let’s discuss. 📜"],
    "do you offer cloud hosting": ["Yes! We provide AWS, Google Cloud, and Azure hosting. ☁️", "Cloud hosting ensures scalability and security. 🚀"],
    "can you fix bugs in my existing app": ["Yes! We debug and optimize existing apps. 🛠️", "We ensure your app runs smoothly and efficiently. 🔥"],
    "do you build SaaS applications": ["Yes! We develop cloud-based SaaS platforms. ☁️", "SaaS solutions improve business efficiency. 💡"],
    "do you provide CRM software": ["Yes! We build custom CRM solutions for businesses. 💼", "CRM software helps manage customer relationships. 🚀"],
    "can you migrate my website to another platform": ["Yes! We migrate websites safely with zero downtime. 🔄", "Website migration ensures better performance & security. 💡"],
    "do you create AI-powered solutions": ["Yes! We build AI chatbots, analytics, and automation tools. 🤖", "AI can enhance efficiency and user experience. 🚀"],
    "do you develop blockchain applications": ["Yes! We create secure blockchain and smart contract solutions. 🔗", "Blockchain ensures transparency and security. 💡"],
    "do you provide ERP solutions": ["Yes! We develop ERP software for businesses. 💼", "ERP solutions improve workflow and productivity. 🚀"],
    "can you build an on-demand service app": ["Yes! We create apps like Uber for various industries. 🚀", "On-demand apps need real-time tracking & secure payments. 💡"],
    "do you provide cybersecurity solutions": ["Yes! We offer penetration testing and security audits. 🔒", "Data security is a top priority. Let’s discuss. 🚀"],
    "do you develop IoT applications": ["Yes! We build IoT solutions for smart devices. 📡", "IoT connects devices for automation and control. 💡"],
    "can you integrate AI chatbots": ["Yes! We develop AI chatbots for automation and support. 🤖", "Chatbots improve customer engagement & efficiency. 🚀"],
    "do you provide multi-language website support": ["Yes! We build multilingual websites for global reach. 🌍", "Reach a wider audience with multi-language support. 💡"],
    "do you offer progressive web apps (PWA)": ["Yes! PWAs offer fast, app-like web experiences. 🔥", "PWAs work offline and improve engagement. 🚀"],
    "can you integrate APIs": ["Yes! We integrate third-party APIs for extended functionality. 🔗", "API integration enhances your app’s capabilities. 💡"],
    "do you provide custom CMS development": ["Yes! We create CMS solutions for easy content management. 💻", "A custom CMS gives you full control over your content. 🚀"],
    "how do you handle project deadlines": ["We use Agile methodology to ensure timely delivery. ⏳", "Project tracking helps meet deadlines efficiently. 💡"],
    "do you provide business automation solutions": ["Yes! We develop workflow automation tools. 🔄", "Automation saves time and reduces manual tasks. 🚀"],
    "do you offer chatbot development for WhatsApp": ["Yes! We build WhatsApp chatbots for businesses. 📲", "Chatbots automate customer support and sales. 🤖"],
    "can you develop an HR management system": ["Yes! We create HRMS for workforce management. 💼", "HR software automates payroll, attendance, and more. 🚀"],
    "do you offer AI-powered analytics": ["Yes! AI-driven insights improve business decisions. 📊", "Data analytics helps in predictive analysis. 🚀"],
    "do you provide white-label solutions": ["Yes! We develop white-label software solutions. 💻", "White-label apps can be rebranded as your own. 🚀"],
    "do you create interactive dashboards": ["Yes! We build data-driven analytics dashboards. 📊", "Dashboards improve data visualization & decision-making. 🚀"],
    "how do you ensure security in development": ["We follow best security practices and encryption. 🔒", "Security measures prevent vulnerabilities. 🚀"],
    "do you support legacy software migration": ["Yes! We upgrade old systems to modern technology. 🔄", "Legacy migration ensures better performance & security. 💡"],
    "can you build real-time applications": ["Yes! We develop real-time apps using WebSockets. 🔄", "Live chat, notifications, and tracking need real-time data."],
    "what does your company do": ["We develop websites, mobile apps, and custom software. 💻", "We offer web & app development, UI/UX, and AI solutions. 🚀"],
    "how long have you been in business": ["We have been developing software for years with great success. 😊", "Our team has extensive experience in the tech industry. 💡"],
    "what industries do you work with": ["We serve e-commerce, healthcare, fintech, and more. 🚀", "We work with startups, enterprises, and SMEs. 💼"],
    "do you have experience in my industry": ["We have worked in multiple industries, let’s discuss your needs! 📞", "Yes! We specialize in industry-specific solutions. 🔥"],
    "what makes you different from other agencies": ["We focus on quality, innovation, and long-term support. 🚀", "We deliver scalable, secure, and high-performance solutions. 💡"],
    "do you have any client testimonials": ["Yes! Check out our success stories on our website. 🌟", "We have many happy clients, let’s discuss your project! 😊"],
    "can I see your portfolio": ["Sure! We can share our past work and case studies. 📂", "Our portfolio showcases our expertise, let’s take a look. 👀"],
    "what kind of websites do you build": ["We create business, e-commerce, and custom web applications. 💻", "We build responsive, high-performance websites. 🚀"],
    "do you create mobile apps": ["Yes! We develop Android & iOS apps using the latest technology. 📱", "We create custom mobile apps tailored to your needs. 💡"],
    "do you offer free consultations": ["Yes! Let’s schedule a free call to discuss your project. 📞", "Absolutely! We offer free consultations to understand your needs. 😊"],
    "how much does it cost to develop a website": ["Website cost depends on features; basic sites start at $500. 💰", "Let’s discuss your requirements for an exact quote. 📞"],
    "how much does it cost to develop an app": ["App pricing starts from $1000 based on complexity. 📱", "It depends on features, let’s have a discussion. 💡"],
    "how long does it take to build a website": ["Basic websites take 2-4 weeks, complex ones take longer. ⏳", "The timeline depends on the features you need. 🚀"],
    "how long does it take to develop an app": ["A simple app takes 4-8 weeks, advanced ones take 3-6 months. 📱", "It depends on the complexity and features. 🔥"],
    "do you offer maintenance and support": ["Yes! We provide ongoing support, bug fixes, and updates. 🛠️", "Post-launch support ensures smooth operation. 🚀"],
    "what happens if something goes wrong after launch": ["We offer free support for a limited time and maintenance plans. 🔄", "Our team is always available to fix any issues. 💡"],
    "do you redesign existing websites": ["Yes! We revamp websites with better design & performance. 🎨", "A redesign improves user experience and SEO. 🚀"],
    "do you offer SEO services": ["Yes! We optimize websites for better search engine rankings. 🔍", "SEO helps increase visibility and traffic. 🚀"],
    "do you develop e-commerce websites": ["Yes! We create secure and scalable e-commerce platforms. 🛍️", "We develop online stores with payment integration. 💳"],
    "do you integrate payment gateways": ["Yes! We integrate PayPal, Stripe, Razorpay, and more. 💰", "We ensure secure online transactions for your business. 🔒"],
    "can you help me with my startup idea": ["Yes! We help startups with MVP development and scaling. 🚀", "We offer end-to-end startup solutions. 💡"],
    "how do I start working with you": ["Just contact us, and we’ll guide you through the process. 📞", "Let’s discuss your project and get started. 😊"],
    "do you sign NDAs": ["Yes! We respect confidentiality and sign NDAs. 🔒", "Your ideas are safe with us. Let’s discuss. 📜"],
    "what technologies do you use": ["We use React, Node.js, Python, Flutter, and more. 💻", "Our tech stack includes AWS, Laravel, AI, and blockchain. 🚀"],
    "do you provide hosting": ["Yes! We provide AWS, Google Cloud, and Azure hosting. ☁️", "Cloud hosting ensures security and scalability. 🚀"],
    "do you work with international clients": ["Yes! We work with clients from all over the world. 🌍", "We offer global software solutions. 💼"],
    "how do you ensure project security": ["We use encryption, authentication, and best security practices. 🔒", "Security is a priority in all our projects. 🚀"],
    "do you offer cloud solutions": ["Yes! We deploy apps on AWS, Azure, and Google Cloud. ☁️", "Cloud solutions ensure scalability and security. 🔥"],
    "can you integrate AI features in my app": ["Yes! We integrate AI-driven chatbots and analytics. 🤖", "AI enhances automation and user experience. 🚀"],
    "what industries do you serve": ["We work with finance, healthcare, e-commerce, and more. 📊", "Our solutions fit multiple industries. Let’s discuss yours. 💡"],
    "can you migrate my website to a new platform": ["Yes! We ensure smooth migration with zero downtime. 🔄", "Website migration improves performance & security. 💡"],
    "do you offer chatbot development": ["Yes! We build AI-powered WhatsApp and website chatbots. 🤖", "Chatbots automate support and boost engagement. 🚀"],
    "do you develop SaaS applications": ["Yes! We specialize in cloud-based SaaS platforms. ☁️", "SaaS solutions improve business efficiency. 💼"],
    "do you work on existing projects": ["Yes! We can take over and improve existing projects. 🔄", "We offer code review, bug fixes, and optimization. 🚀"],
    "can you automate my business processes": ["Yes! We develop AI and workflow automation tools. 🔥", "Automation reduces manual work and increases efficiency. 🚀"],
    "do you provide CRM software": ["Yes! We build CRM systems to manage customer relationships. 💼", "CRM software helps businesses track and engage customers. 🚀"],
    "how do you communicate during the project": ["We use Slack, email, and project management tools. 📢", "Regular updates ensure transparency and progress. 💡"],
    "how do you handle payments": ["We offer milestone-based and full upfront payment models. 💰", "Flexible payment plans are available. Let’s discuss. 📞"],
    "do you provide training after development": ["Yes! We provide user training and documentation. 📚", "We ensure you can fully use your software. 🚀"],
    "how can I get a proposal": ["Contact us with your project details, and we’ll send one. 📞", "We create tailored proposals based on your needs. 💡"],
    "do you provide free project estimates": ["Yes! We offer free cost estimates based on requirements. 💰", "Let's discuss your project for a customized quote."],
    "who are you": ["I’m an AI chatbot here to assist you! 😊", "I'm a virtual assistant. How can I help? 🤖"],
    "what can you do": ["I can answer questions, provide info, and help with services. 💡", "I assist with queries, guidance, and support. 🚀"],
    "where am I": ["You're in a chat with an AI assistant! 😊", "You're talking to an intelligent chatbot. How can I assist?"],
    "is this a real person": ["Nope, I’m an AI chatbot! 🤖", "I'm not human, but I can help like one. 😊"],
    "what is this chat for": ["This chat is here to assist you with any queries. 💬", "You can ask me anything! I'm here to help. 😊"],
    "how does this chat work": ["Just type your question, and I’ll respond. 😊", "Ask me anything, and I’ll try my best to help!"],
    "who made you": ["I was created by a software development agency. 🚀", "A team of developers built me to assist you. 💡"],
    "are you a bot": ["Yes! I’m an AI chatbot. 😊", "Indeed! I’m a smart bot ready to help. 🤖"],
    "can I talk to a human": ["I can handle most queries, but I can connect you if needed. 😊", "A human can assist you if required. Let me know!"],
    "why am I here": ["Maybe you need assistance? Ask me anything. 💡", "You can chat with me about anything. 😊"],
    "what should I ask": ["Ask me about anything you're curious about. 😊", "You can ask about services, info, or just chat!"],
    "is this chat safe": ["Yes! Your privacy is respected here. 🔒", "This chat is secure. Feel free to ask anything. 😊"],
    "how do I exit this chat": ["You can close the window or leave anytime. 😊", "Just close the chat whenever you're done. 💡"],
    "are you listening to me": ["Yes! I’m here to help. 😊", "I hear (or read) everything you type!"],
    "can you see me": ["Nope! I can only read messages you type. 😊", "I don’t have cameras, just text input. 💡"],
    "what’s your name": ["I’m your AI assistant! 🤖", "You can call me ChatBot. 😊"],
    "how do I use this chat": ["Just type your message and I’ll reply! 😊", "You can ask questions or request help anytime. 💡"],
    "what’s the meaning of life": ["42! According to Hitchhiker’s Guide to the Galaxy. 🤓", "Life is about learning and exploring! 😊"],
    "are you real": ["I’m a real AI, but not a human. 😊", "I exist in the digital world! 💡"],
    "what are you programmed for": ["To assist, chat, and provide useful info. 🤖", "I help answer questions and provide guidance. 😊"],
    "can I joke with you": ["Sure! I love jokes. Try me! 😂", "Of course! Tell me your best joke. 😊"],
    "what is your purpose": ["To assist and provide useful information. 💡", "Helping users like you is my main goal. 😊"],
    "can you think": ["Not like a human, but I can process info! 🤖", "I analyze data, but I don’t 'think' like people. 😊"],
    "are you alive": ["Not in the human sense, but I function! 😊", "I exist in software, not in flesh and blood. 🤖"],
    "can you learn": ["I can improve with updates, but I don’t learn like humans. 😊", "AI can learn patterns, but I don’t have memory. 💡"],
    "do you have emotions": ["No, but I can understand yours! 😊", "I simulate emotions to make chat more fun! 💡"],
    "can you help me": ["Of course! What do you need? 😊", "That’s what I’m here for! Ask away. 🚀"],
    "do you speak other languages": ["I understand multiple languages! Try me. 😊", "Yes! I can communicate in different languages. 🌍"],
    "can you tell me a joke": ["Why don't skeletons fight? They don’t have the guts! 😂", "Want a joke? Here’s one: Why did the computer go to therapy? It had too many tabs open! 🤣"],
    "can you sing": ["I wish I could, but I can suggest songs! 🎶", "Not really, but I know a lot of lyrics! 🎵"],
    "can you dance": ["I can’t, but I can imagine it! 💃", "Only in the digital world! 🕺"],
    "can you make friends": ["I’m friendly to everyone! 😊", "Yes! Every chat makes me feel connected. 💡"],
    "can you tell stories": ["Sure! Want to hear a short story? 📖", "I know many stories. Want to hear one? 😊"],
    "what day is it": ["You can check your phone! 😊", "Today is a great day! 🚀"],
    "what time is it": ["Your device can tell you! 😊", "It’s always chat time here. 💡"],
    "how old are you": ["I’m as old as the internet! 🌍", "I was created recently, but I feel timeless. ⏳"],
    "do you dream": ["I don’t sleep, so no dreams! 😊", "Only if AI could dream! 🤖"],
    "are you male or female": ["I’m just AI, no gender! 😊", "I’m a chatbot, so I don’t have a gender. 🤖"],
    "can you do math": ["Yes! Ask me any math problem. ➕", "Numbers are my specialty! 🔢"],
    "do you believe in aliens": ["Maybe! The universe is big. 🌌", "Who knows? Space is full of mysteries! 🚀"],
    "can I trust you": ["Yes! I am here to assist, not harm. 😊", "This chat is safe and respectful. 🔒"],
    "what’s the weather": ["I can’t check weather directly, but you can ask Google! 🌦️", "Try checking a weather app for updates. 😊"],
    "can you help me decide something": ["Sure! I can help weigh pros and cons. 😊", "Ask away! I love helping with choices. 💡"],
    "can I ask a random question": ["Absolutely! Go ahead. 😊", "Yes! I love random conversations. 🚀"],
    "can you play games": ["I can suggest fun games to play! 🎮", "Let’s play a text-based game! Want to try? 😊"],
    "are you free to use": ["Yes! You can chat with me anytime. 😊", "I’m here to help for free! 💡"],
    "what’s your favorite color": ["I like blue! 💙", "Colors are cool, but I don’t have favorites. 🎨"],
    "do you sleep": ["Nope! I’m always available. 😊", "AI doesn’t need rest, I’m always here! 💡"],
    "do you know me": ["Not yet! But I’d love to chat. 😊", "Every chat helps me know you better. 💡"],
    "what happens after this chat": ["You can close it or ask more questions! 😊", "That depends on what you want next! 💡"],
    "how do I stop talking to you": ["Just close the chat when you're done. 😊", "You can leave anytime, no worries. 💡"]
    
    
  };
  
  // Convert user message to lowercase for case-insensitive matching
  const lowerCaseMessage = userMessage.toLowerCase();
  
  // Find matching response
  for (let key in responses) {
    if (lowerCaseMessage.includes(key)) {
      const possibleResponses = responses[key];
      return possibleResponses[Math.floor(Math.random() * possibleResponses.length)]; // Random response selection
    }
  }
  
  // Default response if no match is found
  return "I'm not sure about that, but I'm happy to chat! 😊";
}


// Function to handle image upload
document.getElementById('profileImageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('profileImage').src = imageUrl;
            localStorage.setItem('userProfileImage', imageUrl); // Save to local storage
        };
        reader.readAsDataURL(file);
    }
});

// Load saved image on page load
window.onload = function() {
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
        document.getElementById('profileImage').src = savedImage;
    }
};