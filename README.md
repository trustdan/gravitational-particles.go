# Particles-Go

A Go implementation of the popular [particles.js](https://github.com/VincentGarreau/particles.js) library, designed for integration with [Hugo](https://gohugo.io/) static websites.

## Features

- Generate particle configurations dynamically on the server using Go
- Multiple predefined particle presets (default, snow, night sky, bubbles, etc.)
- Create random particle configurations
- Customizable through shortcode parameters
- Full compatibility with the original particles.js JavaScript library

## Installation

1. First, ensure you have Go installed and set up on your system.

2. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/particles-go.git
   cd particles-go
   ```

3. Build the project:
   ```bash
   go build
   ```

## Usage with Hugo

### Step 1: Add particles.js to your Hugo site

Download the original [particles.js](https://github.com/VincentGarreau/particles.js) library and add the `particles.min.js` file to your Hugo static directory:

```
your-hugo-site/
├── static/
│   └── js/
│       └── particles.min.js
```

### Step 2: Create the Hugo shortcode

Create a file at `layouts/shortcodes/particles.html` with the shortcode implementation provided in this repository.

### Step 3: Run the Go server

Run the included Go server alongside your Hugo site:

```bash
./particles-go
```

This will start a server on port 8080 that generates particle configurations.

### Step 4: Use the shortcode in your content

Now you can use the shortcode in your Hugo content files:

```markdown
<!-- Default configuration -->
{{< particles >}}

<!-- Use a preset -->
{{< particles preset="snow" >}}

<!-- Customize parameters -->
{{< particles color="#ff0000" number="150" size="5" >}}
```

## Available Presets

- `default`: Standard configuration with white particles and linking lines
- `snow`: Falling snow particles
- `nightsky`: A starry night sky effect with subtle twinkling
- `spacydots`: Connected dots that follow cursor movement
- `bubbles`: Floating bubble-like particles that react to mouse hover

## Shortcode Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| id | Container element ID | `id="my-particles"` |
| preset | Use a predefined preset | `preset="snow"` |
| color | Particle color | `color="#ff0000"` |
| number | Number of particles | `number="150"` |
| shape | Particle shape type | `shape="circle"` |
| size | Particle size | `size="5"` |
| speed | Movement speed | `speed="3"` |
| direction | Movement direction | `direction="bottom"` |

## Integration Options

### Option 1: Separate Services (Development)

Run the Hugo server and Go server as separate processes during development:

```bash
# Terminal 1
hugo server

# Terminal 2
./particles-go
```

### Option 2: Integrated Server (Production)

For production, you might want to:

1. Use a reverse proxy like Nginx to serve both your Hugo site and the Go API
2. Embed Hugo as a library in your Go application
3. Use Cloudflare Workers or similar to generate configurations client-side

## License

MIT License - See LICENSE file for details.

## Acknowledgements

- [particles.js](https://github.com/VincentGarreau/particles.js) - The original JavaScript library by Vincent Garreau
- [Hugo](https://gohugo.io/) - The static site generator
