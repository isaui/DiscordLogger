# isaui-discord-logger

A TypeScript library for logging messages to Discord using webhooks.

## Installation

```bash
npm install isaui-discord-logger
```

## Usage

First, import the package and create an instance of the DiscordLogger:

```typescript
import DiscordLogger from 'isaui-discord-logger';

const logger = new DiscordLogger(
  'YOUR_DISCORD_WEBHOOK_URL',
  'Your Footer Text',
  process.env.NODE_ENV === 'production'
);
```

Then, you can use the logger to send messages:

```typescript
// Send an info message
await logger.info('Info Title', 'This is an informational message');

// Send a success message
await logger.success('Success!', 'Operation completed successfully');

// Send an error message
await logger.error('Error Occurred', 'Something went wrong');

// Send a custom log message
await logger.log({
  title: 'Custom Log',
  description: 'This is a custom log message',
  fields: [
    { name: 'Field 1', value: 'Value 1' },
    { name: 'Field 2', value: 'Value 2', inline: true }
  ],
  color: 10181046 // Purple color
});
```

## API

### `DiscordLogger`

#### Constructor

```typescript
constructor(webhookUrl: string, footerText: string, isProduction: boolean)
```

- `webhookUrl`: The Discord webhook URL to send messages to.
- `footerText`: Text to be displayed in the footer of each message.
- `isProduction`: Boolean indicating whether the logger is running in a production environment.

#### Methods

##### `log(options: LogOptions): Promise<void>`

Sends a custom log message to Discord.

```typescript
interface LogOptions {
  title: string;
  description: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  color?: number;
}
```

##### `info(title: string, description: string, fields?: { name: string; value: string; inline?: boolean }[]): Promise<void>`

Sends an info message (blue color) to Discord.

##### `success(title: string, description: string, fields?: { name: string; value: string; inline?: boolean }[]): Promise<void>`

Sends a success message (green color) to Discord.

##### `error(title: string, description: string, fields?: { name: string; value: string; inline?: boolean }[]): Promise<void>`

Sends an error message (red color) to Discord.

## Features

- Environment-aware logging (adds 🚀 for production, 🛠️ for development)
- Customizable message colors
- Support for message fields
- Timestamps in Asia/Jakarta timezone

## License

[MIT](https://choosealicense.com/licenses/mit/)