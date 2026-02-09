// Enhanced Doodle World Application with Light Colorful Tints and Cute Doodles
const appData = {
  user: {
    name: "Jamie"
  },
  progress: {
    questionnaire: {
      completed: 12,
      total: 20
    },
    tracking_items: [
      "Emotional Growth Score",
      "Communication Score", 
      "Focus Time"
    ]
  },
  child_activities: [
    {
      name: "Sound Garden",
      background_color: "#E8D5FF",
      tint_color: "#F8F7FF",
      icon: "plant",
      description: "Musical and audio activities",
      doodles: ["♪", "♫", "🎵", "🌸", "🌱"],
      cuteMessage: "🎵 Welcome to your magical Sound Garden! 🎵\n\nCreate beautiful melodies and discover enchanting sounds! Let music notes dance around you as you explore different instruments and rhythms. Every sound you make adds magic to your garden! ♪🌸✨"
    },
    {
      name: "Doodle Pad", 
      background_color: "#FFE4E1",
      tint_color: "#FFF5F7",
      icon: "teddy-pencil",
      description: "Drawing and creative activities",
      doodles: ["✏️", "🖍️", "💖", "⭐", "🌟"],
      cuteMessage: "🎨 Time to unleash your creativity! 🎨\n\nGrab your magical pencils and crayons to create amazing artwork! Draw anything your heart desires - from cute animals to magical landscapes. Every stroke brings your imagination to life! ✏️💖⭐"
    },
    {
      name: "Story Cloud",
      background_color: "#E3F2FD",
      tint_color: "#F0F8FF", 
      icon: "cloud",
      description: "Storytelling and imagination",
      doodles: ["☁️", "⭐", "📚", "📖", "🌟"],
      cuteMessage: "☁️ Float away on clouds of imagination! ☁️\n\nCreate wonderful stories and magical adventures! Let your creativity soar as high as the clouds while you write, read, and share amazing tales. Every story is a new journey! 📚⭐🌟"
    },
    {
      name: "Calm Corner",
      background_color: "#FFF9C4",
      tint_color: "#FFFEF0",
      icon: "lotus", 
      description: "Meditation and relaxation",
      doodles: ["🌸", "🍃", "🌱", "🧘", "💫"],
      cuteMessage: "🧘 Welcome to your peaceful Calm Corner 🧘\n\nTake deep breaths and find your inner peace! Practice gentle meditation, mindfulness, and relaxation techniques. Let the gentle flowers and leaves guide you to tranquility! 🌸🍃💫"
    }
  ],
  parent_activities: [
    {
      name: "Progress Tracker",
      title: "🌱 Amazing Growth Progress! 🌱",
      message: "Look at all the wonderful development happening! Your child's emotional growth, communication skills, and focus time are flourishing like a beautiful garden! Every milestone is a step toward becoming even more amazing! 📈💖🌸\n\nTracking:\n• Emotional Growth Score\n• Communication Score\n• Focus Time"
    },
    {
      name: "Sweet Questionnaire", 
      title: "📝 Questionnaire Journey (12/20) 📝",
      message: "Fantastic progress! You're 12 steps into your 20-question journey! 🌟\n\nEach thoughtful answer helps us create a more personalized and magical experience just for your family. Your insights are invaluable in crafting the perfect doodle world! Keep going - you're doing wonderfully! ✨💕"
    },
    {
      name: "Daily Journal",
      title: "📖 Daily Magic Reflections 📖", 
      message: "Take just one special minute to capture today's moments! 💫\n\nLog mood, sleep patterns, and daily behaviors in your magical journal. Every entry helps track patterns and growth over time. Your daily reflections are precious memories that help us understand your journey better! 📚✏️💖"
    }
  ],
  tint_colors: {
    extra_light_lavender: "#F5F3FF",
    extra_light_pink: "#FFF5F7",
    extra_light_mint: "#F0FFF4",
    extra_light_peach: "#FFF7EB",
    extra_light_blue: "#F0F8FF",
    extra_light_yellow: "#FFFEF0",
    extra_light_coral: "#FFF5FB",
    extra_light_sage: "#F6FFFA",
    extra_light_lilac: "#F8F7FF"
  },
  doodle_elements: {
    header_doodles: ["🌈", "☁️", "⭐", "💖", "✨"],
    character_doodles: ["✨", "💫", "⭐", "💖", "🌟"],
    button_doodles: ["⭐", "✨", "💫"],
    floating_doodles: ["💖", "⭐", "🌟", "✨", "☁️", "🌸", "💫"],
    parent_zone_doodles: {
      progress: ["🌱", "🍃", "🌸"],
      questionnaire: ["✓", "💖", "📝"],
      journal: ["📚", "✏️", "💖"]
    }
  },
  cute_messages: {
    welcome: [
      "✨ Welcome to your magical Doodle World! ✨",
      "🌈 Ready for some enchanting adventures? 🌈",
      "💖 Let's create beautiful memories together! 💖"
    ],
    journey_start: [
      "🚀 Your magical journey begins now! 🚀",
      "✨ Adventure awaits in every corner! ✨",
      "🌟 Let the doodle magic unfold! 🌟"
    ],
    success: [
      "🎉 Amazing work! Keep going! 🎉",
      "🌟 You're doing wonderfully! 🌟", 
      "💖 Fantastic progress! 💖"
    ]
  }
};

// DOM Elements
let startJourneyBtn = null;
let continueBtn = null;
let activityTiles = null;
let parentCards = null;
let cuteModal = null;
let modalTitle = null;
let modalMessage = null;
let closeModal = null;
let floatingHeartsContainer = null;

// Initialize DOM elements
function initializeDOMElements() {
  startJourneyBtn = document.getElementById('startJourney');
  continueBtn = document.querySelector('.continue-btn');
  activityTiles = document.querySelectorAll('.activity-tile');
  parentCards = document.querySelectorAll('.parent-card');
  cuteModal = document.getElementById('cuteModal');
  modalTitle = document.getElementById('modalTitle');
  modalMessage = document.getElementById('modalMessage');
  closeModal = document.getElementById('closeModal');
  floatingHeartsContainer = document.getElementById('floatingHearts');
}

// Initialize the enhanced Doodle World application
function initDoodleWorld() {
  console.log('🌈 Initializing magical Doodle World...');
  
  initializeDOMElements();
  setupEventListeners();
  animateProgressRing();
  startFloatingDoodleAnimation();
  addEnhancedHoverEffects();
  initializeCharacterAnimations();
  showWelcomeMessage();
  
  console.log('✨ Doodle World is ready for magic! ✨');
}

// Setup all interactive event listeners
function setupEventListeners() {
  // Enhanced Start Journey Button
  if (startJourneyBtn) {
    startJourneyBtn.addEventListener('click', handleMagicalJourneyStart);
    startJourneyBtn.addEventListener('mouseenter', () => enhanceButtonWithDoodles(startJourneyBtn));
  }
  
  // Continue Questionnaire Button
  if (continueBtn) {
    continueBtn.addEventListener('click', handleQuestionnaireInteraction);
  }
  
  // Activity Tiles with enhanced interactions - Fixed modal routing
  if (activityTiles) {
    activityTiles.forEach((tile, index) => {
      tile.addEventListener('click', () => {
        console.log(`Activity tile clicked: ${index}`);
        handleActivityTileClick(tile, index);
      });
      tile.addEventListener('mouseenter', () => enhanceTileWithDoodles(tile, index));
      tile.addEventListener('mouseleave', () => cleanupTileEnhancements(tile));
    });
  }
  
  // Parent Cards with enhanced feedback - Fixed modal routing
  if (parentCards) {
    parentCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        console.log(`Parent card clicked: ${index}`);
        handleParentCardClick(card, index);
      });
      card.addEventListener('mouseenter', () => enhanceCardWithDoodles(card, index));
    });
  }

  // Modal interactions
  if (closeModal) {
    closeModal.addEventListener('click', closeMagicalModal);
  }
  
  if (cuteModal) {
    cuteModal.addEventListener('click', (e) => {
      if (e.target === cuteModal) closeMagicalModal();
    });
  }

  // Keyboard interactions for accessibility and fun
  document.addEventListener('keydown', handleMagicalKeypress);
  
  // Character interactions
  const characters = document.querySelectorAll('.character');
  characters.forEach((character, index) => {
    character.addEventListener('click', () => handleCharacterClick(character, index));
  });
}

// Handle magical journey start with enhanced feedback
function handleMagicalJourneyStart() {
  console.log('🚀 Starting magical journey...');
  
  // Visual feedback
  startJourneyBtn.style.transform = 'scale(0.95)';
  startJourneyBtn.style.background = '#FFD700';
  
  // Create magical particle effect
  createMagicalParticles(8, 'journey');
  
  // Button animation
  setTimeout(() => {
    startJourneyBtn.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
      startJourneyBtn.style.transform = 'scale(1)';
      startJourneyBtn.style.background = '#FFC947';
      
      // Smooth scroll to Parent Zone
      const parentZone = document.querySelector('.parent-zone');
      if (parentZone) {
        parentZone.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      // Show welcome to parent zone message
      setTimeout(() => {
        showMagicalModal(
          '🌈 Welcome to the Parent Zone! 🌈',
          'Here you can track your child\'s amazing progress, continue the personalized questionnaire, and write beautiful daily reflections! Everything is designed with love to support your family\'s journey! 💖✨🌸'
        );
      }, 1200);
      
      // Highlight sections with gentle animations
      highlightZonesWithMagic();
      
    }, 200);
  }, 150);
}

// Handle questionnaire interaction - Fixed to show correct modal
function handleQuestionnaireInteraction() {
  console.log('📝 Continuing questionnaire...');
  
  if (!continueBtn) return;
  
  continueBtn.style.transform = 'scale(0.95)';
  continueBtn.style.background = '#1FB8CD';
  continueBtn.style.color = '#FFFFFF';
  
  createMagicalParticles(4, 'questionnaire');
  
  setTimeout(() => {
    continueBtn.style.transform = 'scale(1)';
    continueBtn.style.background = 'transparent';
    continueBtn.style.color = '#1FB8CD';
    
    // Show the CORRECT questionnaire modal (index 1)
    const questionnaireActivity = appData.parent_activities[1];
    if (questionnaireActivity) {
      showMagicalModal(questionnaireActivity.title, questionnaireActivity.message);
    }
  }, 300);
}

// Handle activity tile clicks with enhanced animations - Fixed modal routing
function handleActivityTileClick(tile, index) {
  console.log(`Handling activity tile click for index: ${index}`);
  
  if (!appData.child_activities[index]) {
    console.error(`No activity data found for index: ${index}`);
    return;
  }
  
  const activity = appData.child_activities[index];
  console.log(`Activity selected: ${activity.name}`);
  
  // Tile click animation
  tile.style.transform = 'translateY(-8px) scale(0.98)';
  
  // Create activity-specific magical effects
  createActivitySpecificEffects(activity, tile);
  
  setTimeout(() => {
    tile.style.transform = 'translateY(-8px) scale(1.05)';
    
    setTimeout(() => {
      tile.style.transform = 'translateY(-8px) scale(1)';
      
      // Show the CORRECT activity modal
      console.log(`Showing modal for: ${activity.name}`);
      showMagicalModal(`✨ ${activity.name} ✨`, activity.cuteMessage);
    }, 200);
  }, 150);
}

// Handle parent card clicks - Fixed modal routing
function handleParentCardClick(card, index) {
  console.log(`Handling parent card click for index: ${index}`);
  
  if (!appData.parent_activities[index]) {
    console.error(`No parent activity data found for index: ${index}`);
    return;
  }
  
  card.style.transform = 'translateY(-8px) scale(0.98)';
  
  const parentActivity = appData.parent_activities[index];
  console.log(`Parent activity selected: ${parentActivity.name}`);
  
  createMagicalParticles(3, 'parent');
  
  setTimeout(() => {
    card.style.transform = 'translateY(-8px) scale(1)';
    
    // Show the CORRECT parent activity modal
    console.log(`Showing modal for: ${parentActivity.name}`);
    showMagicalModal(parentActivity.title, parentActivity.message);
  }, 200);
}

// Handle character clicks for fun interactions
function handleCharacterClick(character, index) {
  console.log(`🧸 Character ${index} clicked!`);
  
  const characterMessages = [
    "🧸 Hi there! I'm your cuddly teddy bear friend! I love hugs and adventures! 💖",
    "🐰 Hello! I'm your sweet bunny companion! I love hopping around and making new friends! 🌸",
    "☁️ Greetings! I'm your dreamy cloud buddy! I carry wishes and dreams wherever I go! ✨"
  ];
  
  // Character bounce animation
  character.style.transform = 'scale(1.2) rotate(10deg)';
  character.style.transition = 'all 0.3s ease';
  
  createMagicalParticles(5, 'character');
  
  setTimeout(() => {
    character.style.transform = 'scale(1) rotate(0deg)';
    
    if (characterMessages[index]) {
      showMagicalModal('✨ Character Message ✨', characterMessages[index]);
    }
  }, 300);
}

// Create magical particle effects
function createMagicalParticles(count, type) {
  const particleTypes = {
    journey: ['🚀', '✨', '🌟', '💫', '🌈'],
    questionnaire: ['📝', '✓', '💖', '🌟', '✨'],
    parent: ['👨‍👩‍👧‍👦', '💖', '🌱', '📊', '✨'],
    character: ['💖', '🌟', '✨', '💫', '🎉'],
    activity: ['🎨', '🎵', '📚', '🧘', '✨']
  };
  
  const particles = particleTypes[type] || particleTypes.activity;
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.position = 'fixed';
      particle.style.fontSize = '24px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '999';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = window.innerHeight + 'px';
      particle.style.transition = 'all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      document.body.appendChild(particle);
      
      // Animate upward with rotation
      setTimeout(() => {
        particle.style.top = '-50px';
        particle.style.transform = `translateX(${(Math.random() - 0.5) * 300}px) rotate(${Math.random() * 720}deg) scale(1.5)`;
        particle.style.opacity = '0';
      }, 100);
      
      // Cleanup
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 3200);
    }, i * 150);
  }
}

// Create activity-specific effects
function createActivitySpecificEffects(activity, tile) {
  if (!activity.doodles) return;
  
  const tileRect = tile.getBoundingClientRect();
  
  activity.doodles.forEach((doodle, index) => {
    setTimeout(() => {
      const effect = document.createElement('div');
      effect.textContent = doodle;
      effect.style.position = 'fixed';
      effect.style.fontSize = '28px';
      effect.style.pointerEvents = 'none';
      effect.style.zIndex = '998';
      effect.style.left = (tileRect.left + Math.random() * tileRect.width) + 'px';
      effect.style.top = (tileRect.top + Math.random() * tileRect.height) + 'px';
      effect.style.transition = 'all 2.5s ease-out';
      effect.style.opacity = '0.9';
      
      document.body.appendChild(effect);
      
      // Animate with specific movement pattern
      setTimeout(() => {
        effect.style.transform = `scale(2) rotate(${Math.random() * 360}deg) translateY(-100px)`;
        effect.style.opacity = '0';
      }, 100);
      
      setTimeout(() => {
        if (effect.parentNode) {
          effect.remove();
        }
      }, 2600);
    }, index * 200);
  });
}

// Enhanced hover effects
function addEnhancedHoverEffects() {
  // Character hover enhancements
  const characters = document.querySelectorAll('.character');
  characters.forEach((character, index) => {
    character.addEventListener('mouseenter', () => {
      character.style.transform = 'scale(1.15) rotate(5deg)';
      character.style.filter = 'brightness(1.2) saturate(1.3)';
      
      // Add sparkle effect
      addSparkleEffectToElement(character);
    });
    
    character.addEventListener('mouseleave', () => {
      character.style.transform = 'scale(1) rotate(0deg)';
      character.style.filter = 'brightness(1) saturate(1)';
      
      removeSparkleEffectFromElement(character);
    });
  });
}

// Add sparkle effect to element
function addSparkleEffectToElement(element) {
  const existingSparkle = element.querySelector('.hover-sparkle-effect');
  if (existingSparkle) return;
  
  const sparkleContainer = document.createElement('div');
  sparkleContainer.className = 'hover-sparkle-effect';
  sparkleContainer.style.position = 'absolute';
  sparkleContainer.style.top = '-15px';
  sparkleContainer.style.left = '-15px';
  sparkleContainer.style.width = '120px';
  sparkleContainer.style.height = '120px';
  sparkleContainer.style.pointerEvents = 'none';
  sparkleContainer.style.zIndex = '10';
  
  // Create multiple sparkles
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement('span');
    sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '14px';
    sparkle.style.animation = `sparkleOrbit 2s linear infinite`;
    sparkle.style.animationDelay = `${i * 0.3}s`;
    sparkle.style.transformOrigin = '60px 60px';
    
    // Position sparkles in a circle
    const angle = (i / 6) * 360;
    sparkle.style.transform = `rotate(${angle}deg) translateX(45px)`;
    
    sparkleContainer.appendChild(sparkle);
  }
  
  element.appendChild(sparkleContainer);
  
  // Add CSS animation if not exists
  if (!document.querySelector('#sparkle-orbit-animation')) {
    const style = document.createElement('style');
    style.id = 'sparkle-orbit-animation';
    style.textContent = `
      @keyframes sparkleOrbit {
        from { transform: rotate(var(--start-angle, 0deg)) translateX(45px) rotate(0deg); }
        to { transform: rotate(calc(var(--start-angle, 0deg) + 360deg)) translateX(45px) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

// Remove sparkle effect from element
function removeSparkleEffectFromElement(element) {
  const sparkleEffect = element.querySelector('.hover-sparkle-effect');
  if (sparkleEffect) {
    sparkleEffect.remove();
  }
}

// Enhance button with doodles
function enhanceButtonWithDoodles(button) {
  const doodles = appData.doodle_elements.button_doodles;
  
  // Add floating doodles around button
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const doodle = document.createElement('span');
      doodle.textContent = doodles[Math.floor(Math.random() * doodles.length)];
      doodle.style.position = 'absolute';
      doodle.style.fontSize = '18px';
      doodle.style.pointerEvents = 'none';
      doodle.style.zIndex = '12';
      doodle.style.opacity = '0.8';
      doodle.style.animation = 'buttonDoodleFloat 2s ease-in-out forwards';
      
      // Position around button
      const buttonRect = button.getBoundingClientRect();
      doodle.style.left = (buttonRect.left + Math.random() * buttonRect.width) + 'px';
      doodle.style.top = (buttonRect.top - 30) + 'px';
      
      document.body.appendChild(doodle);
      
      setTimeout(() => {
        if (doodle.parentNode) {
          doodle.remove();
        }
      }, 2000);
    }, i * 200);
  }
  
  // Add CSS if not exists
  if (!document.querySelector('#button-doodle-animation')) {
    const style = document.createElement('style');
    style.id = 'button-doodle-animation';
    style.textContent = `
      @keyframes buttonDoodleFloat {
        0% { transform: translateY(0px) scale(1); opacity: 0.8; }
        50% { transform: translateY(-20px) scale(1.3); opacity: 1; }
        100% { transform: translateY(-40px) scale(0.8); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Enhance tiles with doodles
function enhanceTileWithDoodles(tile, index) {
  if (!appData.child_activities[index]) return;
  
  const activity = appData.child_activities[index];
  tile.style.filter = 'brightness(1.1) saturate(1.2)';
  
  // Make existing tile doodles more visible on hover
  const tileDoodles = tile.querySelectorAll('.tile-doodle');
  tileDoodles.forEach(doodle => {
    doodle.style.opacity = '0.9';
    doodle.style.transform = 'scale(1.2)';
  });
}

// Clean up tile enhancements
function cleanupTileEnhancements(tile) {
  tile.style.filter = 'brightness(1) saturate(1)';
  
  const tileDoodles = tile.querySelectorAll('.tile-doodle');
  tileDoodles.forEach(doodle => {
    doodle.style.opacity = '0.6';
    doodle.style.transform = 'scale(1)';
  });
}

// Enhance cards with doodles
function enhanceCardWithDoodles(card, index) {
  card.style.filter = 'brightness(1.05) saturate(1.1)';
  
  // Make existing card doodles more visible
  const cardDoodles = card.querySelectorAll('.card-doodle');
  cardDoodles.forEach(doodle => {
    doodle.style.opacity = '0.8';
    doodle.style.transform = 'scale(1.3)';
  });
}

// Start floating background doodle animation
function startFloatingDoodleAnimation() {
  // Enhanced floating doodles are already in CSS, this adds dynamic ones
  setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance every 4 seconds
      const doodles = appData.doodle_elements.floating_doodles;
      const randomDoodle = doodles[Math.floor(Math.random() * doodles.length)];
      
      createFloatingDoodle(randomDoodle);
    }
  }, 4000);
}

// Create individual floating doodle
function createFloatingDoodle(doodleText) {
  const doodle = document.createElement('div');
  doodle.textContent = doodleText;
  doodle.style.position = 'fixed';
  doodle.style.fontSize = '18px';
  doodle.style.opacity = '0.25';
  doodle.style.pointerEvents = 'none';
  doodle.style.zIndex = '2';
  doodle.style.left = Math.random() * window.innerWidth + 'px';
  doodle.style.top = window.innerHeight + 20 + 'px';
  doodle.style.transition = 'all 12s linear';
  
  document.body.appendChild(doodle);
  
  setTimeout(() => {
    doodle.style.top = '-50px';
    doodle.style.transform = `translateX(${(Math.random() - 0.5) * 200}px) rotate(360deg)`;
  }, 100);
  
  setTimeout(() => {
    if (doodle.parentNode) {
      doodle.remove();
    }
  }, 12200);
}

// Animate progress ring
function animateProgressRing() {
  const progressRing = document.querySelector('.progress-ring');
  if (!progressRing) return;
  
  const percentage = (appData.progress.questionnaire.completed / appData.progress.questionnaire.total) * 100;
  const degrees = (percentage / 100) * 360;
  
  setTimeout(() => {
    progressRing.style.background = `conic-gradient(#1FB8CD 0deg ${degrees}deg, #ECEBD5 ${degrees}deg 360deg)`;
    progressRing.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
      progressRing.style.transform = 'scale(1)';
    }, 400);
  }, 800);
}

// Initialize character animations
function initializeCharacterAnimations() {
  const characters = document.querySelectorAll('.character');
  
  characters.forEach((character, index) => {
    // Stagger the character entrance animations
    setTimeout(() => {
      character.style.opacity = '0';
      character.style.transform = 'translateY(30px) scale(0.8)';
      character.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      setTimeout(() => {
        character.style.opacity = '1';
        character.style.transform = 'translateY(0) scale(1)';
      }, 100);
    }, index * 300);
  });
}

// Show magical modal - Fixed to ensure proper content display
function showMagicalModal(title, message) {
  if (!cuteModal || !modalTitle || !modalMessage) {
    console.error('Modal elements not found!');
    return;
  }
  
  console.log('✨ Showing magical modal:', title);
  console.log('Modal message:', message);
  
  // Clear any existing content first
  modalTitle.textContent = '';
  modalMessage.textContent = '';
  
  // Set new content
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalMessage.style.whiteSpace = 'pre-line'; // Allow line breaks
  
  // Show modal
  cuteModal.classList.remove('hidden');
  
  // Enhanced entrance animation
  const modalContent = cuteModal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.style.transform = 'scale(0.7) translateY(-50px) rotate(-5deg)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
      modalContent.style.transform = 'scale(1) translateY(0) rotate(0deg)';
      modalContent.style.opacity = '1';
      modalContent.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 50);
  }
  
  // Add modal particles
  createMagicalParticles(4, 'character');
}

// Close magical modal
function closeMagicalModal() {
  if (!cuteModal) return;
  
  console.log('💫 Closing magical modal...');
  
  const modalContent = cuteModal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.style.transform = 'scale(0.8) translateY(-30px) rotate(3deg)';
    modalContent.style.opacity = '0';
  }
  
  setTimeout(() => {
    cuteModal.classList.add('hidden');
  }, 300);
}

// Show welcome message
function showWelcomeMessage() {
  setTimeout(() => {
    const welcomeMessages = appData.cute_messages.welcome;
    const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    
    showNotification(randomMessage, 'success');
    createMagicalParticles(3, 'character');
  }, 2000);
}

// Highlight zones with magic
function highlightZonesWithMagic() {
  const sections = ['.parent-zone', '.child-zone'];
  
  sections.forEach((selector, index) => {
    setTimeout(() => {
      const section = document.querySelector(selector);
      if (section) {
        section.style.animation = 'magicalHighlight 2s ease-in-out';
        
        setTimeout(() => {
          section.style.animation = '';
        }, 2000);
      }
    }, index * 600);
  });
  
  // Add CSS animation if not exists
  if (!document.querySelector('#magical-highlight-animation')) {
    const style = document.createElement('style');
    style.id = 'magical-highlight-animation';
    style.textContent = `
      @keyframes magicalHighlight {
        0% { transform: scale(1); box-shadow: 0 8px 25px rgba(31, 184, 205, 0.2); }
        50% { transform: scale(1.02); box-shadow: 0 15px 40px rgba(31, 184, 205, 0.4); }
        100% { transform: scale(1); box-shadow: 0 8px 25px rgba(31, 184, 205, 0.2); }
      }
    `;
    document.head.appendChild(style);
  }
}

// Handle magical keypress interactions
function handleMagicalKeypress(event) {
  // Fun Easter eggs
  if (event.key === 'h' && event.ctrlKey) {
    event.preventDefault();
    createMagicalParticles(8, 'character');
    showNotification('💖 Magical hearts for you! 💖', 'success');
  }
  
  if (event.key === 's' && event.ctrlKey) {
    event.preventDefault();
    createMagicalParticles(10, 'journey');
    showNotification('✨ Sparkle magic activated! ✨', 'success');
  }
  
  // Escape key closes modal
  if (event.key === 'Escape') {
    closeMagicalModal();
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const existingNotification = document.querySelector('.magical-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `magical-notification status status--${type}`;
  notification.innerHTML = `
    <span class="notification-icon">✨</span>
    <span class="notification-text">${message}</span>
    <span class="notification-icon">✨</span>
  `;
  
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.zIndex = '1000';
  notification.style.transform = 'translateX(120%) scale(0.8)';
  notification.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  notification.style.borderRadius = '25px';
  notification.style.padding = '12px 20px';
  notification.style.fontSize = '14px';
  notification.style.fontWeight = '500';
  notification.style.boxShadow = '0 8px 25px rgba(31, 184, 205, 0.3)';
  notification.style.border = '2px solid #1FB8CD';
  notification.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0) scale(1)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(120%) scale(0.8)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 500);
  }, 5000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌈 DOM loaded, initializing Doodle World...');
  initDoodleWorld();
  
  // Add responsive touch support
  addTouchSupport();
  
  // Character entrance animation
  setTimeout(() => {
    const characters = document.querySelectorAll('.character');
    characters.forEach((character, index) => {
      setTimeout(() => {
        character.style.animation = 'characterEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }, index * 200);
    });
  }, 1000);
});

// Add touch support for mobile devices
function addTouchSupport() {
  const interactiveElements = document.querySelectorAll('.btn, .activity-tile, .parent-card, .character');
  
  interactiveElements.forEach(element => {
    element.addEventListener('touchstart', function(e) {
      this.style.transform = 'scale(0.95)';
      createMagicalParticles(2, 'character');
    }, { passive: true });
    
    element.addEventListener('touchend', function(e) {
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }, { passive: true });
  });
}

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
  // Adjust container padding for smaller screens
  const container = document.querySelector('.container');
  if (container) {
    if (window.innerWidth < 768) {
      container.style.padding = '0 16px';
    } else {
      container.style.padding = '0 24px';
    }
  }
});

// Add character entrance animation CSS
const characterAnimationStyle = document.createElement('style');
characterAnimationStyle.textContent = `
  @keyframes characterEntrance {
    0% {
      opacity: 0;
      transform: translateY(50px) scale(0.3) rotate(-10deg);
    }
    60% {
      opacity: 0.8;
      transform: translateY(-10px) scale(1.1) rotate(5deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0deg);
    }
  }
`;
document.head.appendChild(characterAnimationStyle);

// Periodic surprise effects
setInterval(() => {
  if (Math.random() < 0.05) { // 5% chance every 20 seconds
    const surpriseMessages = [
      '🌟 You\'re amazing! Keep exploring! 🌟',
      '✨ Magic is all around you! ✨', 
      '💖 Sending you positive energy! 💖',
      '🌈 Your creativity brightens the world! 🌈'
    ];
    const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    showNotification(randomMessage, 'success');
    createMagicalParticles(3, 'character');
  }
}, 20000);

console.log('🎉 Doodle World application loaded successfully! 🎉');