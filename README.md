# Reausable Slider created with Next, React, Tailwind and TypeScript

## How to import:

Import the Slider to your project built with Next, React, Tailwind and TypeScript in one of the two ways:

- **Option 1 (recommended):** Copy everything from app/components/Slider.tsx with <kbd>cmd</kbd> + <kbd>A</kbd>. Create a new file that ends with .tsx for the component in your own project and paste the Slider here.
- **Option 2:** Use git clone to get the full repo.

## How to use:

The Slider-component renders the children in a slider automatically. Map out your components inside the Slider (recommended) or build your components directly in it.

```bash
<Slider>
   Map out or build your components here.
</Slider>
```

## Props:

The Slider-component receives the pre-built settings as props.
<br/>
All props except **children** are optional.

### Available component settings:

| Prop                    | Type                                   | Default value | Union type options |
| ----------------------- | -------------------------------------- | ------------- | ------------------ |
| children                | ReactElement or array of ReactElements | undefined     |
| hasButtons              | boolean                                | false         |
| buttonLeftNode          | ReactNode                              | '<'           |
| buttonRightNode         | ReactNode                              | '>'           |
| hasScrollbar            | boolean                                | false         |
| hasAnimation            | boolean                                | false         |
| animationType           | string                                 | 'opacity'     | 'opacity'          |
| scrollAnimation         | string                                 | 'reveal'      | 'reveal', 'both'   |
| scrollWidthInPercentage | number                                 | 100           |

### Available classes as settings:

We do not recommend changing the styles in the Slider-component file.
<br/>
Add more styling or override default class values on elements with the following props:

| Prop                   | Type   | Default value                                                                                                                               |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| sliderWrapperStyle     | string | 'relative z-0'                                                                                                                              |
| buttonsWrapperStyle    | string | 'absolute pointer-events-none inset-0 z-50'                                                                                                 |
| buttonLeftStyle        | string | 'absolute pointer-events-auto'                                                                                                              |
| buttonRightStyle       | string | 'absolute pointer-events-auto'                                                                                                              |
| componentsWrapperStyle | string | 'flex overscroll-x-contain hover:cursor-grab', mouseIsDown && 'hover:cursor-grabbing', hasScrollbar ? 'overflow-x-auto' : 'overflow-hidden' |
| componentWrapperStyle  | string | 'grow-0 shrink-0 overflow-hidden', hasAnimation && 'transition duration-300 ease-in-out'                                                    |

### Example usage of settings as props:

```bash
<Slider
   hasButtons={true}
   buttonLeftNode={<ChevronLeft/>}
   buttonRightNode={<ChevronRight/>}
   hasAnimation={true}
   scrollAnimation="both"
   scrollWidthInPercentage={75}
   buttonLeftStyle='p-2 bg-white text-gray-900 rounded top-1/2 -translate-y-1/2 left-6 opacity-100 transition-opacity disabled:opacity-0'
   buttonRightStyle='p-2 bg-white text-gray-900 rounded top-1/2 -translate-y-1/2 right-6 opacity-100 transition-opacity disabled:opacity-0'
   componentsWrapperStyle='p-2 gap-2 md:p-4 xl:p-6 md:gap-4 xl:gap-6'
   componentWrapperStyle='w-1/2 md:w-1/3 xl:w-1/4 aspect-[4/5]'
>

   Map out or build your components here.
</Slider>
```

## File structure:

Everything you need for the Slider is built in the same file. If your project has another file structure - feel free to separate and move for example util-functions and types outside the component-file.
