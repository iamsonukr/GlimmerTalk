export const funEmojis = [
    "🍂",  // Fall Leaf
    "🌸",  // Cherry Blossom
    "🍉",  // Watermelon
    "🍀",  // Four Leaf Clover
    "🎉",  // Party Popper
    "🌞",  // Sun
    "🌈",  // Rainbow
    "💥",  // Explosion
    "🚀",  // Rocket
    "🐶",  // Dog
    "🐱",  // Cat
    "🐼",  // Panda
    "🦄",  // Unicorn
    "🌟",  // Star
    "🎈",  // Balloon
];

export const getRandomEmoji = () => {
    return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};
