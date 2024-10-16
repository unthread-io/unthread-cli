# @unthread/cli

A CLI tool for interacting with Unthread services.

## Installation

You can install the Unthread CLI from the
[GitHub Releases page](https://github.com/unthread-io/unthread-cli/releases).
Visit the
[GitHub Releases page](https://github.com/unthread-io/unthread-cli/releases) and
download the appropriate binary for your operating system and architecture.

#### macOS (Intel)

```bash
curl -L https://github.com/unthread-io/unthread-cli/releases/latest/download/unthread-v1.0.0.darwin.amd64 -o unthread
chmod +x unthread
sudo mv unthread /usr/local/bin/
```

#### macOS (Apple Silicon)

```bash
curl -L https://github.com/unthread-io/unthread-cli/releases/latest/download/unthread-v1.0.0.darwin.arm64 -o unthread
chmod +x unthread
sudo mv unthread /usr/local/bin/
```

#### Linux (x86_64)

```bash
curl -L https://github.com/unthread-io/unthread-cli/releases/latest/download/unthread-v1.0.0.linux.amd64 -o unthread
chmod +x unthread
sudo mv unthread /usr/local/bin/
```

#### Linux (ARM64)

```bash
curl -L https://github.com/unthread-io/unthread-cli/releases/latest/download/unthread-v1.0.0.linux.arm64 -o unthread
chmod +x unthread
sudo mv unthread /usr/local/bin/
```

#### Windows

Download the `unthread-v1.0.0.exe` file from the releases page and add it to
your system PATH.

## Usage

The basic usage of the CLI is:

```bash
unthread [command] [options]
```

### Authentication

To use the Unthread CLI, you need to authenticate with your API key. Set the
`UNTHREAD_API_KEY` environment variable with your API key:

```bash
export UNTHREAD_API_KEY=your_api_key_here
```

Alternatively, you can pass the API key as an environment variable when running
a command:

```bash
UNTHREAD_API_KEY=your_api_key_here unthread [command] [options]
```

### Available Commands

- `version`: Display the version of the Unthread CLI
- `automations`: Automation commands
  - `functions`: Automation functions commands
    - `deploy <entrypoint>`: Deploy a new version of the automation functions -
      This will overwrite any existing draft you have.

### Global Options

- `-b, --base-url <baseUrl>`: Unthread API base URL (defaults to
  `https://api.unthread.io/api`)

## Development

This project uses Deno for development and building.

To run the CLI in development mode:

```bash
deno task dev
```

To build the CLI for different platforms:

```bash
deno task build:all
```

This will compile the CLI for Linux (amd64 and arm64), macOS (amd64 and arm64),
and Windows (amd64).

## Project Structure

- `src/`: Contains the main source files
- `sample/`: Includes sample automation function code
- `build.sh`: Shell script for building the CLI for different platforms
- `deno.json`: Configuration file for Deno and project dependencies

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.
