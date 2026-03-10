# Stopwatch & Countdown Timer

A modern, fully-featured stopwatch and countdown timer application built with **Next.js 14** and **TypeScript**.

## Features

### Stopwatch

- Start, pause, and reset functionality
- Automatic lap tracking when paused
- Display time in HH:MM:SS format
- Beautiful lap history with timestamps

### Countdown Timer

- Customizable hours, minutes, and seconds
- Start, pause, and reset controls
- Audio alarm when time reaches zero
- Input validation and user feedback

## Technologies

- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **CSS Modules** - Scoped styling
- **React Hooks** - State management

## Getting Started

### Installation

1. Clone the repository or navigate to the project folder
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
online-stopwatch/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── TimerApp.tsx        # Main app component with tabs
│   ├── TimerApp.module.css # Tab styles
│   ├── Stopwatch.tsx       # Stopwatch component
│   ├── Stopwatch.module.css
│   ├── Countdown.tsx       # Countdown timer component
│   └── Countdown.module.css
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript config
├── next.config.js         # Next.js config
└── .gitignore
```

## Features in Detail

### Type Safety

- Full TypeScript support for all components
- Proper typing for React hooks and state management
- Type-checked event handlers

### Performance

- Next.js optimization with automatic code splitting
- CSS Modules for scoped styling
- Efficient state updates with React hooks

### User Experience

- Beautiful gradient UI
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Disabled button states for better UX

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
