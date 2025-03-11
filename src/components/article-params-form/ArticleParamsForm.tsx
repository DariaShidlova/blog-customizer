import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import {
  ArticleStateType,
  fontColors,
  fontFamilyOptions,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (settings: ArticleStateType) => void;
  onReset: () => void;
  currentSettings: ArticleStateType;
  onChange: (newState: boolean) => void;
};

export const ArticleParamsForm = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  currentSettings,
  onChange,
}: ArticleParamsFormProps) => {
    // Локальное состояние для черновика настроек
  const [draftSettings, setDraftSettings] = useState(currentSettings);
   // Реф для сайдбара
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setDraftSettings(currentSettings);
  }, [isOpen, currentSettings]);

  // Закрытие при клике вне области
  useOutsideClickClose({
    isOpen,
    rootRef: sidebarRef,
    onClose,
    onChange,
  });

  // Обработчик изменений полей
  const handleSettingChange = (type: keyof ArticleStateType) => 
    (value: typeof draftSettings[typeof type]) => {
      setDraftSettings(prev => ({ ...prev, [type]: value }));
    };

    // Отправка формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(draftSettings);
  };

  // Сброс формы
  const handleFormReset = () => {
    setDraftSettings(defaultArticleState);
    onReset();
  };

  return (
    <>
    {/* кнопка-стрелка */}
      <ArrowButton isOpen={isOpen} onClick={() => onChange(!isOpen)} />
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
          <Select
            title="Шрифт"
            selected={draftSettings.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleSettingChange('fontFamilyOption')}
          />
          <Separator />
		  <RadioGroup
            title="Размер шрифта"
            name="font-size"
            options={fontSizeOptions}
            selected={draftSettings.fontSizeOption}
            onChange={handleSettingChange('fontSizeOption')}
          />
          <Separator />
          <Select
            title="Цвет шрифта"
            selected={draftSettings.fontColor}
            options={fontColors}
            onChange={handleSettingChange('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            selected={draftSettings.backgroundColor}
            options={backgroundColors}
            onChange={handleSettingChange('backgroundColor')}
          />
          <Separator />
          <Select
            title="Ширина контента"
            selected={draftSettings.contentWidth}
            options={contentWidthArr}
            onChange={handleSettingChange('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              type="clear"
              htmlType="reset"
            />
            <Button
              title="Применить"
              type="apply"
              htmlType="submit"
            />
          </div>
        </form>
      </aside>
    </>
  );
};