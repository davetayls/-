# ★ Responsive Grid System

This began as a bit of an experiment but is proving to be quite useful.

It is a grid system based on fractions which encourages modular semantics and flexibility to control a cell based on it's context within the system.

## Installation

Currently only available from the dist folder in this git repo or npm.

`npm install blackstar --save`

### Usage with CSS Modules

I've designed this to be compatible as a CSS module.

### Usage with PostCSS

You can inject these styles into your stylesheet using PostCSS. I'll add some customisation in time.

```
@blackstar {}
```

## Examples

There are a number of examples in the docs.html file in the root of the project.

## Rules

### All columns should be wrapped in the `bs` class.

### Media Sizes
The media sizes available currently map to these media queries however this might change to target particular sizes.

| Size | Media Query |
| ---- | ---- |
| No namespace | everywhere |
| `xs` | (max-width: 544px) |
| `sm` | (min-width: 545px) and (max-width: 767px) |
| `md` | (min-width: 768px) and (max-width: 1023px) |
| `lg` | (min-width:1024px) |
| `xl` | (min-width: 1280px) |

### Cell ClassName format

Class names for cells follow the following format and allow for the fractions based on 1,2,3,4,6

`bs[namespace]-[fraction][|fraction]`

Here are some examples:

```
bs-1 => full width block
bs-1/2 => half
bs-2/3 => two thirds
bs-2/3|1/2 => half when inside two thirds

bssm-1 => full width block on small device
bssm-1/2 => half on small device
bssm-2/3 => two thirds on small device
bssm-2/3|1/2 => half when inside two thirds on small device
```

Nesting is provided for a single level deep. So we don't currently include something like `bs-2/3|1/2|1/2`.

## Examples
Here are some examples of what it might look like:

```
  <div class="bs">
    <div class="bs-1/3">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1/2 bs-1/2|1/2 ">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1 bs-1/2|1">
      <div>...</div>
    </div>
  </div>
```

## Gutters
```  
  <div class="bs bs--gutters">
    <div class="bs-1/3 bssm-1/2">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1/2">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1">
      <div>...</div>
    </div>
  </div>
```

## Responsive Gutters
```  
  <div class="bs bsmd--gutters">
    <div class="bs-1/3 bssm-1/2">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1/2">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1">
      <div>...</div>
    </div>
  </div>
```

## Gutters with flush
```
  <div class="bs bs--gutters">
    <div class="bs-1/3 bssm-1/2 bs-|flushLeft">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1/2">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1 bs-|flushRight">
      <div>...</div>
    </div>
  </div>  
```

## Responsive Gutters with flush
```
  <div class="bs bsmd--gutters">
    <div class="bs-1/3 bssm-1/2 bsmd-|flushLeft">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1/2">
      <div>...</div>
    </div>
    <div class="bs-1/3 bssm-1 bsmd-|flushRight">
      <div>...</div>
    </div>
  </div>  
```
