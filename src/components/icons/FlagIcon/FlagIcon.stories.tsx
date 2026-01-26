import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FlagIcon } from './FlagIcon';
import type { CountryCode } from './FlagIcon.types';

const allCountries: CountryCode[] = [
  'abkhazia',
  'afghanistan',
  'åland islands',
  'albania',
  'algeria',
  'american samoa',
  'andorra',
  'angola',
  'anguilla',
  'antigua and barbuda',
  'argentina',
  'armenia',
  'aruba',
  'australia',
  'austria',
  'azerbaijan',
  'azoresislands',
  'bahamas',
  'bahrain',
  'balearicislands',
  'bangladesh',
  'barbados',
  'basquecountry',
  'belarus',
  'belgium',
  'belize',
  'benin',
  'bermuda',
  'bhutan',
  'bolivia',
  'bonaire',
  'bosnia and herzegovina',
  'botswana',
  'brazil',
  'british indian ocean territory',
  'britishcolumbia',
  'brunei',
  'bulgaria',
  'burkina faso',
  'burundi',
  'cambodia',
  'cameroon',
  'canada',
  'canaryislands',
  'cape verde',
  'cayman islands',
  'central african republic',
  'ceuta',
  'chad',
  'chile',
  'china',
  'cocosisland',
  'colombia',
  'comoros',
  'cook islands',
  'corsica',
  'costa rica',
  'croatia',
  'cuba',
  'curaçao',
  'cyprus',
  'czech republic',
  'democratic republic of the congo',
  'denmark',
  'djibouti',
  'dominica',
  'dominican republic',
  'easttimor',
  'ecuador',
  'egypt',
  'el salvador',
  'equatorial guinea',
  'eritrea',
  'estonia',
  'ethiopia',
  'europeanunion',
  'falklandislands',
  'faroe islands',
  'fiji',
  'finland',
  'france',
  'french polynesia',
  'gabon',
  'galapagosislands',
  'gambia',
  'gbeng',
  'gbsct',
  'gbwls',
  'georgia',
  'germany',
  'ghana',
  'gibraltar',
  'greece',
  'greenland',
  'grenada',
  'guam',
  'guatemala',
  'guernsey',
  'guinea',
  'guinea-bissau',
  'guyana',
  'haiti',
  'hawaii',
  'holy see (vatican city state)',
  'honduras',
  'hong kong',
  'hungary',
  'iceland',
  'india',
  'indonesia',
  'iran',
  'iraq',
  'ireland',
  'isle of man',
  'israel',
  'italy',
  'ivorycoast',
  'jamaica',
  'japan',
  'jersey',
  'jordan',
  'kazakhstan',
  'kenya',
  'kiribati',
  'kosovo',
  'kuwait',
  'kyrgyzstan',
  'laos',
  'latvia',
  'lebanon',
  'lesotho',
  'liberia',
  'libya',
  'liechtenstein',
  'lithuania',
  'luxembourg',
  'macao',
  'madagascar',
  'madeira',
  'malawi',
  'malaysia',
  'maldives',
  'mali',
  'malta',
  'marshallisland',
  'martinique',
  'mauritania',
  'mauritius',
  'melilla',
  'mexico',
  'micronesia',
  'moldova',
  'monaco',
  'mongolia',
  'montenegro',
  'montserrat',
  'morocco',
  'mozambique',
  'myanmar',
  'namibia',
  'nato',
  'nauru',
  'nepal',
  'netherlands',
  'new zealand',
  'nicaragua',
  'niger',
  'nigeria',
  'niue',
  'norfolk island',
  'north korea',
  'northerncyprus',
  'northernmarianasislands',
  'norway',
  'oman',
  'orkneyislands',
  'ossetia',
  'pakistan',
  'palau',
  'palestine',
  'panama',
  'papua new guinea',
  'paraguay',
  'peru',
  'philippines',
  'pitcairnislands',
  'poland',
  'portugal',
  'puerto rico',
  'qatar',
  'rapanui',
  'republic of the congo',
  'republicofmacedonia',
  'romania',
  'russia',
  'rwanda',
  'sabaisland',
  'sahrawiarabdemocraticrepublic',
  'samoa',
  'san marino',
  'saotomeandprince',
  'sardinia',
  'saudi arabia',
  'senegal',
  'serbia',
  'seychelles',
  'sierra leone',
  'singapore',
  'sinteustatius',
  'sintmaarten',
  'slovakia',
  'slovenia',
  'solomon islands',
  'somalia',
  'somaliland',
  'south africa',
  'south korea',
  'south sudan',
  'spain',
  'sri lanka',
  'stbarts',
  'stlucia',
  'stvincentandthegrenadines',
  'sudan',
  'suriname',
  'swaziland',
  'sweden',
  'switzerland',
  'syria',
  'taiwan',
  'tajikistan',
  'tanzania',
  'thailand',
  'tibet',
  'togo',
  'tokelau',
  'tonga',
  'transnistria',
  'trinidad and tobago',
  'tunisia',
  'turkey',
  'turkmenistan',
  'turksandcaicos',
  'tuvalu',
  'uganda',
  'ukraine',
  'united arab emirates',
  'united kingdom',
  'unitednations',
  'unitedstates',
  'uruguay',
  'uzbekistan',
  'vanuatu',
  'venezuela',
  'vietnam',
  'virgin islands, british',
  'virgin islands, u.s.',
  'yemen',
  'zambia',
  'zimbabwe',
];

const meta: Meta<typeof FlagIcon> = {
  title: 'Components/Icons/FlagIcon',
  component: FlagIcon,
  tags: ['autodocs'],
  argTypes: {
    country: {
      control: 'select',
      options: allCountries,
      description: '국기의 국가 또는 지역 코드',
      table: {
        type: {
          summary: 'CountryCode',
          detail: `국가 이름 또는 코드 (260개 이상 옵션)
예시: 'unitedstates', 'united kingdom', 'south korea', 'europeanunion'`,
        },
      },
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: '아이콘 크기 (픽셀)',
      table: {
        type: {
          summary: 'number',
          detail: '기본값: 24',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FlagIcon>;

/**
 * 기본 FlagIcon
 *
 * FlagIcon 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: SVG 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    country: 'unitedstates',
    size: 24,
    className: '',
  },
  render: (args) => {
    const iconRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (iconRef.current) {
        console.log('FlagIcon ref:', iconRef.current);
      }
    }, []);

    return <FlagIcon ref={iconRef} {...args} />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {[16, 20, 24, 32, 40, 48].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <FlagIcon country="south korea" size={size} />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>{size}px</div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const PopularCountries: Story = {
  render: () => {
    const countries: { code: CountryCode; name: string }[] = [
      { code: 'unitedstates', name: 'United States' },
      { code: 'united kingdom', name: 'United Kingdom' },
      { code: 'south korea', name: 'South Korea' },
      { code: 'japan', name: 'Japan' },
      { code: 'china', name: 'China' },
      { code: 'germany', name: 'Germany' },
      { code: 'france', name: 'France' },
      { code: 'canada', name: 'Canada' },
      { code: 'australia', name: 'Australia' },
      { code: 'brazil', name: 'Brazil' },
      { code: 'india', name: 'India' },
      { code: 'spain', name: 'Spain' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px' }}>
        {countries.map(({ code, name }) => (
          <div key={code} style={{ textAlign: 'center' }}>
            <FlagIcon country={code} size={32} />
            <div style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-subtle)' }}>
              {name}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Organizations: Story = {
  render: () => {
    const orgs: { code: CountryCode; name: string }[] = [
      { code: 'europeanunion', name: 'European Union' },
      { code: 'unitednations', name: 'United Nations' },
      { code: 'nato', name: 'NATO' },
    ];
    return (
      <div style={{ display: 'flex', gap: '32px' }}>
        {orgs.map(({ code, name }) => (
          <div key={code} style={{ textAlign: 'center' }}>
            <FlagIcon country={code} size={48} />
            <div style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-subtle)' }}>
              {name}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
