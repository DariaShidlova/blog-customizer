import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentSettings, setCurrentSettings] = useState(defaultArticleState); //текущие примененные настройки
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); //состояние видимости сайтбара

	const handleApply = (newSettings: ArticleStateType) => {
		setCurrentSettings(newSettings); //сохранение новых настроек
		setIsSidebarOpen(false); //закрытие сайтбара
	};

	const handleReset = () => {
		setCurrentSettings(defaultArticleState); //сброс к первоначальному состоянию
		setIsSidebarOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentSettings.fontFamilyOption.value,
					'--font-size': currentSettings.fontSizeOption.value,
					'--font-color': currentSettings.fontColor.value,
					'--container-width': currentSettings.contentWidth.value,
					'--bg-color': currentSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen} //текущее состояние
				onClose={() => setIsSidebarOpen(false)} //закрытие
				onApply={handleApply} //подтверждение изменений
				onReset={handleReset} //сброс настроек
				currentSettings={currentSettings} //актуальные настройки
				onChange={(newState) => setIsSidebarOpen(newState)} //изменение состояния
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
