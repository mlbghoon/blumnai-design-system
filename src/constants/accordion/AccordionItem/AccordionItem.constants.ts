import { BG, BG_STATE, BORDER, BORDER_STYLE, RADIUS, SHADOWS, SPACING } from 'constants/common/token-classes';

import type { AccordionItemStyle } from 'components/accordion/AccordionItem/AccordionItem.types';

// 기본 스타일 box-shadow
export const BOX_SHADOW = SHADOWS.card;

export const OPEN_CARD_CLASSES = `${BG.card} ${BORDER_STYLE.border} ${BORDER.default}`;

export const STYLE_BASE_CLASSES: Record<AccordionItemStyle, string> = {
  default: `${BG.card} ${BORDER_STYLE.border} ${RADIUS.lg.default} ${SPACING.p6} ${BORDER.default}`,
  soft: `${BG_STATE.soft} ${RADIUS.lg.default} ${SPACING.p6}`,
  ghost: `${BG.transparent} ${RADIUS.lg.default} ${SPACING.p6}`,
  line: `${BG.transparent} ${BORDER_STYLE.border0} ${BORDER_STYLE.borderB} ${RADIUS.none.default} ${SPACING.py6} ${SPACING.px0} ${BORDER.default}`,
};

export const STYLE_HOVER_CLASSES: Record<AccordionItemStyle, string> = {
  default: BG.cardSubtle,
  soft: BG_STATE.softHover,
  ghost: BG_STATE.ghostHover,
  line: BORDER.darker,
};

export const STYLE_OPEN_CLASSES: Record<AccordionItemStyle, string> = {
  default: '',
  soft: `${OPEN_CARD_CLASSES} ${SHADOWS.card}`,
  ghost: `${OPEN_CARD_CLASSES} ${SHADOWS.card}`,
  line: '',
};
