## Windowsユーザ向けDockerセットアップ
(注: このドキュメントは作りかけです)


WindowsユーザはMacやLinuxと比較して環境構築で迷いやすいです。Dockerを使用して比較的マシに環境をセットアップできます。以下の手順に従ってください。

1. **Dockerのインストール**
   - Docker Desktopをインストールし、起動します。

2. **Dockerイメージのビルド**
   - プロジェクトのルートディレクトリで以下のコマンドを実行してDockerイメージをビルドします。

   ```bash
   docker build -t broadlistening .
   ```

3. **Dockerコンテナの起動**
   - 以下のコマンドを実行してDockerコンテナを起動し、レポートを生成します。

   ```bash
   docker run -p 8000:8000 broadlistening
   ```

   ブラウザで`http://localhost:8000`を開き、生成されたレポートを確認します。
