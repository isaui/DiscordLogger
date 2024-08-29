import 'isomorphic-fetch';

interface LogOptions {
  title: string;
  description: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  color?: number;
}

class DiscordLogger {
  private webhookUrl: string;
  private footerText: string;
  private isProduction: boolean;

  constructor(webhookUrl: string, footerText: string, isProduction: boolean) {
    this.webhookUrl = webhookUrl;
    this.footerText = footerText;
    this.isProduction = isProduction;
  }

  private getEnvironmentPrefix(): string {
    return this.isProduction ? '🚀' : '🛠️';
  }

  private getFormattedTimestamp(): string {
    return new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');
  }

  async log(options: LogOptions): Promise<void> {
    if (!this.webhookUrl) {
      console.error('Discord webhook URL is not set');
      return;
    }

    const embed = {
      title: `${this.getEnvironmentPrefix()} ${options.title}`,
      description: options.description,
      color: options.color,
      fields: options.fields || [],
      timestamp: new Date().toISOString(),
      footer: {
        text: `${this.footerText} | ${this.getFormattedTimestamp()}`
      }
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ embeds: [embed] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Message sent to Discord: ${options.title}`);
    } catch (error) {
      console.error('Failed to send message to Discord webhook:', error);
    }
  }

  async info(title: string, description: string, fields?: { name: string; value: string; inline?: boolean }[]): Promise<void> {
    await this.log({ title, description, fields, color: 3447003 }); // Blue color
  }

  async success(title: string, description: string, fields?: { name: string; value: string; inline?: boolean }[]): Promise<void> {
    await this.log({ title, description, fields, color: 3066993 }); // Green color
  }

  async error(title: string, description: string, fields?: { name: string; value: string; inline?: boolean }[]): Promise<void> {
    await this.log({ title, description, fields, color: 15158332 }); // Red color
  }
}

export default DiscordLogger;