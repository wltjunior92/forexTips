import { useEffect, useState } from 'react';
import { useTheme, VStack } from 'native-base';
import { WebView } from 'react-native-webview';

import { getTradingView } from '@utils/TradingView';
import { Header } from '@components/Header';

export function TradeChart() {
  const [html, setHtml] = useState('');
  const { colors } = useTheme();

  useEffect(() => {
    const tradingViewHtml = getTradingView(colors.gray[900]);
    setHtml(tradingViewHtml)
  }, [])

  return (
    <VStack flex={1}>
      <Header title="Chart Trading" />

      <WebView
        style={{ flex: 1, backgroundColor: colors.gray[900] }}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </VStack>
  );
};
