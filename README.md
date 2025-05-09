Showcase は芝浦工業大学のデジタル創作サークル「デジクリ」のための作品投稿プラットフォームです。

# 技術構成

- TypeScript, Bun
- Next.js App Router
  - React Router v7 へ移行予定
- SQLite, Drizzle, Turso
- Tailwind CSS, justd
- Conform
- Valibot

# 環境構築

## 依存関係のインストール

```bash
bun install
```

## 開発サーバーの起動

```bash
bun run dev
```

## データベースのプレビュー

```bash
bunx drizzle-kit studio
```

## データベースのマイグレーション

```bash
bunx drizzle-kit migrate
```
