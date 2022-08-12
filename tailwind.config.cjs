// 1 代表 4px，例如：text-1 代表 4px 的 fontSize，可以加减 + 0.25 来添加 1 px。
const sizes = new Array(200 + 1).fill(null).reduce(
  (result, _, i) => ({
    ...result,
    [i]: `${i * 4}px`,
    [i + 0.25]: `${i * 4 + 1}px`,
    [i + 0.5]: `${i * 4 + 2}px`,
    [i + 0.75]: `${i * 4 + 3}px`,
  }),
  {},
);

const colors = {
  black: {
    primary: 'rgba(0, 0, 0, 1)',
  },
  gray: {
    primary: 'rgba(93, 93, 93, 1)',
  },
  white: {
    primary: 'rgba(255, 255, 255, 1)',
  },
  green: {
    primary: 'rgba(52, 255, 96, 1)',
  },
  blue: {
    primary: 'rgba(0, 145, 255, 1)',
    secondary: 'rgba(50, 197, 255, 1)',
  },
  yellow: {
    primary: 'rgba(255, 227, 24, 1)',
  },
  orange: {
    primary: 'rgba(255, 106, 0, 1)',
  },
  purple: {
    primary: 'rgba(98, 54, 255, 1)',
  },
};

// 给颜色添加透明度
// [color]-primary-0.9 代表透明度 0.9
// [color]-primary-0.8 代表透明度 0.8
// 以此类推
const colorsWithOpacity = Object.keys(colors).reduce((result, colorKey) => {
  const colorValue = colors[colorKey];
  const priorityColors = Object.keys(colorValue).reduce((result, priorityKey) => {
    const prioryColor = colorValue[priorityKey];
    const priorityColorsWitchOpacity = new Array(9).fill(null).reduce(
      (result, _, i) => {
        const opacity = (1 - ((i + 1) / 10).toFixed(1)).toFixed(1);
        const curColor = prioryColor.split('').slice();
        curColor.splice(-2, 1, opacity);
        return {
          ...result,
          [`${priorityKey}-${opacity}`]: curColor.join(''),
        };
      },
      {
        [priorityKey]: prioryColor,
      },
    );
    return {
      ...result,
      ...priorityColorsWitchOpacity,
    };
  }, {});

  return {
    ...result,
    [colorKey]: priorityColors,
  };
}, {});

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx,svelte}', './public/index.html'],
  darkMode: true, // or 'media' or 'class'
  important: true,
  variants: {
    extend: {
      borderWidth: ['first'],
    }
  },
  theme: {
    screens: {
      xl: '1150px',
      '2xl': '1250px',
      '3xl': '1300px',
    },
    extend: {
      fontSize: sizes,
      spacing: {
        ...sizes,
        '1/5': '20%',
        '1/10': '10%',
        '1/20': '5%',
        '1/30': '3.3333%',
      },
      borderWidth: sizes,
      borderRadius: sizes,
      fontWeight: {
        9: 900,
        7: 700,
        5: 500,
        4: 400,
        3: 300,
      },
      colors: colorsWithOpacity,
      keyframes: {
        shake: {
          '0%': {
            transform: 'rotate(-30deg)',
          },
          '25%': {
            transform: 'rotate(30deg)',
          },
          '50%': {
            transform: 'rotate(-30deg)',
          },
          '75%': {
            transform: 'rotate(30deg)',
          },
          '100%': {
            transform: 'rotate(0)',
          },
        },
        poke: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-16px)' },
          '50%': { transform: 'translateX(0)' },
          '75%': { transform: 'translateX(-16px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'poke-s': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(0)' },
          '75%': { transform: 'translateX(-10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        call: {
          '0%': { transform: 'rotate(0) scale(1)' },
          '25%': { transform: 'rotate(15deg) scale(1.2)' },
          '50%': { transform: 'rotate(-15deg) scale(1.2)' },
          '75%': { transform: 'rotate(15deg) scale(1)' },
          '100%': { transform: 'rotate(0) scale(1)' },
        },
        avatarRotate: {
          '0%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(45deg)' },
          '50%': { transform: 'rotate(0)' },
          '75%': { transform: 'rotate(45deg)' },
          '100%': { transform: 'rotate(0)' },
        },
      },
      animation: {
        poke: 'poke 0.5s infinite',
        'poke-s': 'poke-s 0.5s infinite',
        avatarRotate: 'avatarRotate 0.5s infinite',
        call: 'call 0.2s 3',
        shake: 'shake 0.5s ease-in',
      },
    },
  },
};
