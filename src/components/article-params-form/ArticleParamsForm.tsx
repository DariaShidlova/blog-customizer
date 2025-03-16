import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import {
	ArticleStateType,
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	setArticleSettings: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	currentSettings: ArticleStateType;
};

export const ArticleParamsForm = ({
	setArticleSettings,
	currentSettings,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	// Локальное состояние для состояния формы
	const [formState, setFormState] = useState(currentSettings);
	// Реф для сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Обработчик клика вне области
	const handleClose = () => {
		setIsOpen(false);
	};

	// Закрытие при клике вне области
	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onClose: handleClose,
		onChange: setIsOpen,
	});

	// Обработчик изменений полей
	const handleSettingChange =
		(type: keyof ArticleStateType) =>
		(value: (typeof formState)[typeof type]) => {
			setFormState((prev) => ({ ...prev, [type]: value }));
		};

	// Отправка формы
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleSettings(formState);
		setIsOpen(false);
	};

	// Сброс формы
	const handleFormReset = () => {
		setArticleSettings(defaultArticleState);
		setFormState(currentSettings);
	};

	const handleToggleOpen = () => setIsOpen((prevState) => !prevState);

	return (
		<>
			{/* кнопка-стрелка */}
			<ArrowButton isOpen={isOpen} onClick={handleToggleOpen} />
			{/* Сайдбар с настройками */}
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleFormReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						align='left'
						uppercase
						dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleSettingChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleSettingChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleSettingChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleSettingChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleSettingChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
