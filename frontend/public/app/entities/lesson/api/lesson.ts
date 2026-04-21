import type { Lesson } from '../model/lesson';

const LESSON_FOR_TEST: Lesson = {
    id: 'lesson_002_1_3',
    title: 'Union и Intersection типы',
    slug: 'union-intersection',
    description: 'Объединение и пересечение типов, type aliases',
    status: 'not-passed',
    tags: ['union', 'intersection'],
    difficulty: 'medium',
    durationInMinutes: 40,
    xpReward: 80,
    mdContent: `
<section class="section" id="s1">
	<h2 class="section__header">
		<span class="section__number">01</span>
		Что такое Flexbox?
	</h2>
	<div class="section__text">
		<p>
			До появления модуля Flexbox Layout существовало четыре режима
			раскладки — блочный, строчный, табличный и позиционированный.
			<strong>Модуль гибкой раскладки Flexbox</strong> упрощает создание
			гибких адаптивных макетов без использования <code>float</code> или
			<code>position</code>.
		</p>
		<p>
			Flex-контейнер расширяет элементы, чтобы заполнить доступное
			свободное пространство, или сжимает их, чтобы предотвратить
			переполнение. Раскладка является
			<strong>независимой от направления</strong> — в отличие от блочной
			(вертикальной) или строчной (горизонтальной).
		</p>
	</div>
	<div class="box box--info">
		<div class="box__ico">💡</div>
		<div class="box__body">
			<strong>Примечание:</strong> Flexbox лучше всего подходит для
			<strong>одномерных</strong> макетов — либо строка, либо колонка за
			раз. Для двумерных макетов (строки и колонки одновременно)
			используйте <strong>CSS Grid</strong>.
		</div>
	</div>
</section>

<section class="section" id="s2">
	<h2 class="section__header">
		<span class="section__number">02</span>
        Flex-контейнер
	</h2>
	<div class="section__text">
		<p>
			Чтобы использовать Flexbox, установите <code>display: flex</code> на
			<strong>родительском элементе</strong>. Этот элемент становится
			<em>flex-контейнером</em>, а его прямые дочерние элементы
			автоматически становятся <strong>flex-элементами</strong>.
		</p>
	</div>

	<div class="editor">
		<div class="editor__bar">
			<div class="editor__dots">
				<div class="editor__dot editor__dot--red"></div>
				<div class="editor__dot editor__dot--yellow"></div>
				<div class="editor__dot editor__dot--green"></div>
			</div>
			<div class="editor__name">
				example_01.css &nbsp;—&nbsp; Базовый flex-контейнер
			</div>
			<span class="editor__lang-tag">CSS</span>
		</div>
		<div class="editor__split">
			<div class="editor__code-side">
				<div class="ln" id="ln1"></div>
				<div class="code" id="cd1">
					<div class="line cm">
						<span class="cm">/* Сделать элемент flex-контейнером */</span>
					</div>
					<div class="line">
						<span class="sl">.container</span>
						<span class="vr">{</span>
					</div>
					<div class="line hl">
						&nbsp;&nbsp;<span class="pr">display</span>
                        <span class="vr">: </span>
                        <span class="vl">flex</span>
                        <span class="vr">;</span>
					</div>
					<div class="line">
						&nbsp;&nbsp;<span class="pr">gap</span
						><span class="vr">: </span><span class="nm">12</span
						><span class="un">px</span><span class="vr">;</span>
					</div>
					<div class="line">
						&nbsp;&nbsp;
                        <span class="cm">/* строка — направление по умолчанию */</span>
					</div>
					<div class="line">
						&nbsp;&nbsp;<span class="pr">flex-direction</span>
                        <span class="vr">: </span>
                        <span class="vl">row</span>
                        <span class="vr">;</span>
					</div>
					<div class="line"><span class="vr">}</span></div>
					<div class="line">&nbsp;</div>
					<div class="line">
						<span class="sl">.item</span> <span class="vr">{</span>
					</div>
					<div class="line">
						&nbsp;&nbsp;<span class="pr">background</span
						><span class="vr">: </span
						><span class="vl">#4f9cff</span
						><span class="vr">;</span>
					</div>
					<div class="line">
						&nbsp;&nbsp;<span class="pr">padding</span
						><span class="vr">: </span><span class="nm">12</span
						><span class="un">px</span> <span class="nm">20</span
						><span class="un">px</span><span class="vr">;</span>
					</div>
					<div class="line">
						&nbsp;&nbsp;<span class="pr">border-radius</span
						><span class="vr">: </span><span class="nm">6</span
						><span class="un">px</span><span class="vr">;</span>
					</div>
					<div class="line"><span class="vr">}</span></div>
				</div>
			</div>
			<div class="editor__prev-side">
				<div class="epv-hdr">
					<span class="epv-lbl">// результат</span>
				</div>
				<div class="epv-canvas">
					<div
						style="
							font-family: monospace;
							font-size: 9px;
							color: #aaa;
							margin-bottom: 8px;
						"
					>
						.container { display: flex; }
					</div>
					<div class="dv-row">
						<div class="dv-box dv-b">Элемент 1</div>
						<div class="dv-box dv-g">Элемент 2</div>
						<div class="dv-box dv-p">Элемент 3</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section" id="s3">
	<h2 class="section__header">
		<span class="section__number">03</span> flex-direction
	</h2>
	<div class="section__text">
		<p>
			Свойство <code>flex-direction</code> определяет направление, в
			котором контейнер располагает свои flex-элементы вдоль главной оси.
		</p>
	</div>

	<div class="table-wrap">
		<table class="table">
			<thead>
				<tr>
					<th>Значение</th>
					<th>Описание</th>
					<th>По умолчанию?</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><span class="td__prop">row</span></td>
					<td class="td__description">
						Элементы располагаются слева направо (горизонтально)
					</td>
					<td><span class="td__default">✓ Да</span></td>
				</tr>
				<tr>
					<td><span class="td__prop">row-reverse</span></td>
					<td class="td__description">
						Элементы располагаются справа налево
					</td>
					<td>—</td>
				</tr>
				<tr>
					<td><span class="td__prop">column</span></td>
					<td class="td__description">
						Элементы располагаются сверху вниз (вертикально)
					</td>
					<td>—</td>
				</tr>
				<tr>
					<td><span class="td__prop">column-reverse</span></td>
					<td class="td__description">
						Элементы располагаются снизу вверх
					</td>
					<td>—</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="editor">
		<div class="editor__bar">
			<div class="editor__dots">
				<div class="editor__dot editor__dot--red"></div>
				<div class="editor__dot editor__dot--yellow"></div>
				<div class="editor__dot editor__dot--green"></div>
			</div>
			<div class="editor__name">
				example_02.css &nbsp;—&nbsp; flex-direction: column
			</div>
			<span class="editor__lang-tag">CSS</span>
		</div>
		<div class="editor__split">
			<div class="editor__code-side">
				<div class="ln" id="ln2"></div>
				<div class="code" id="cd2">
					<div class="line">
						<span class="sl">.container</span>
						<span class="vr">{</span>
					</div>
					<div class="line">
						&nbsp;&nbsp;<span class="pr">display</span
						><span class="vr">: </span><span class="vl">flex</span
						><span class="vr">;</span>
					</div>
					<div class="line hl">
						&nbsp;&nbsp;<span class="pr">flex-direction</span
						><span class="vr">: </span><span class="vl">column</span
						><span class="vr">;</span>
					</div>
					<div class="line">
						&nbsp;&nbsp;<span class="pr">gap</span
						><span class="vr">: </span><span class="nm">8</span
						><span class="un">px</span><span class="vr">;</span>
					</div>
					<div class="line"><span class="vr">}</span></div>
				</div>
			</div>
			<div class="editor__prev-side">
				<div class="epv-hdr">
					<span class="epv-lbl">// результат</span>
				</div>
				<div class="epv-canvas">
					<div
						style="
							display: flex;
							flex-direction: column;
							gap: 6px;
							max-width: 110px;
						"
					>
						<div class="dv-box dv-b" style="text-align: center">
							Элемент 1
						</div>
						<div class="dv-box dv-g" style="text-align: center">
							Элемент 2
						</div>
						<div class="dv-box dv-p" style="text-align: center">
							Элемент 3
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section" id="s4">
	<h2 class="section__header">
		<span class="section__number">04</span> justify-content
	</h2>
	<div class="section__text">
		<p>
			Свойство <code>justify-content</code> выравнивает flex-элементы
			вдоль <strong>главной оси</strong> (горизонтальной при
			<code>flex-direction: row</code>). Оно управляет распределением
			пространства между элементами и вокруг них.
		</p>
	</div>

	<div class="box box--tip">
		<div class="box__ico">✅</div>
		<div class="box__body">
			<strong>Совет:</strong> <code>space-between</code> создаёт равные
			промежутки между элементами, но не по краям. Используйте
			<code>space-evenly</code> для равномерных отступов, включая края.
			<code>center</code> группирует все элементы по центру.
		</div>
	</div>

	<div class="editor">
		<div class="editor__bar">
			<div class="editor__dots">
				<div class="editor__dot editor__dot--red"></div>
				<div class="editor__dot editor__dot--yellow"></div>
				<div class="editor__dot editor__dot--green"></div>
			</div>
			<div class="editor__name">
				example_03.css &nbsp;—&nbsp; Значения justify-content
			</div>
			<span class="editor__lang-tag">CSS</span>
		</div>
		<div class="editor__split">
			<div class="editor__code-side">
				<div class="ln" id="ln3"></div>
				<div class="code" id="cd3">
					<div class="line cm">
						<span class="cm"
							>/* Равные отступы между элементами */</span
						>
					</div>
					<div class="line">
						<span class="sl">.sb</span> <span class="vr">{</span>
					</div>
					<div class="line hl">
						&nbsp;&nbsp;<span class="pr">justify-content</span
						><span class="vr">: </span
						><span class="vl">space-between</span
						><span class="vr">;</span>
					</div>
					<div class="line"><span class="vr">}</span></div>
					<div class="line">&nbsp;</div>
					<div class="line cm">
						<span class="cm">/* Все элементы по центру */</span>
					</div>
					<div class="line">
						<span class="sl">.center</span>
						<span class="vr">{</span>
					</div>
					<div class="line hl">
						&nbsp;&nbsp;<span class="pr">justify-content</span
						><span class="vr">: </span><span class="vl">center</span
						><span class="vr">;</span>
					</div>
					<div class="line"><span class="vr">}</span></div>
				</div>
			</div>
			<div class="editor__prev-side">
				<div class="epv-hdr">
					<span class="epv-lbl">// результат</span>
				</div>
				<div class="epv-canvas">
					<div
						style="
							font-family: monospace;
							font-size: 8px;
							color: #999;
							margin-bottom: 4px;
						"
					>
						space-between:
					</div>
					<div
						style="
							display: flex;
							justify-content: space-between;
							background: #f0f4f8;
							padding: 6px;
							border-radius: 4px;
							margin-bottom: 8px;
						"
					>
						<div class="dv-box dv-b">1</div>
						<div class="dv-box dv-g">2</div>
						<div class="dv-box dv-p">3</div>
					</div>
					<div
						style="
							font-family: monospace;
							font-size: 8px;
							color: #999;
							margin-bottom: 4px;
						"
					>
						center:
					</div>
					<div
						style="
							display: flex;
							justify-content: center;
							gap: 7px;
							background: #f0f4f8;
							padding: 6px;
							border-radius: 4px;
						"
					>
						<div class="dv-box dv-b">1</div>
						<div class="dv-box dv-g">2</div>
						<div class="dv-box dv-p">3</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section" id="s5">
	<h2 class="section__header">
		<span class="section__number">05</span> align-items
	</h2>
	<div class="section__text">
		<p>
			Свойство <code>align-items</code> выравнивает flex-элементы вдоль
			<strong>поперечной оси</strong> (вертикальной при
			<code>flex-direction: row</code>). Представьте его как
			<code>justify-content</code> для перпендикулярного направления.
		</p>
		<ul>
			<li>
				<code>stretch</code> — элементы растягиваются, чтобы заполнить
				контейнер (по умолчанию)
			</li>
			<li>
				<code>center</code> — элементы центрируются по поперечной оси
			</li>
			<li>
				<code>flex-start</code> — элементы выравниваются по началу
				поперечной оси
			</li>
			<li>
				<code>flex-end</code> — элементы выравниваются по концу
				поперечной оси
			</li>
			<li>
				<code>baseline</code> — элементы выравниваются по базовой линии
				текста
			</li>
		</ul>
	</div>
	<div class="box box--warn">
		<div class="box__ico">⚠️</div>
		<div class="box__body">
			<strong>Частая ошибка:</strong> Путаница между
			<code>align-items</code> (задаёт выравнивание для
			<em>всех</em> flex-элементов в контейнере) и
			<code>align-self</code> (переопределяет выравнивание для
			<em>одного</em> flex-элемента).
		</div>
	</div>
</section>

<section class="section" id="s6">
	<h2 class="section__header">
		<span class="section__number">06</span> Сокращённая запись
		<code style="font-size: 18px">flex</code>
	</h2>
	<div class="section__text">
		<p>
			Свойство <code>flex</code> — это сокращённая запись для
			<code>flex-grow</code>, <code>flex-shrink</code> и
			<code>flex-basis</code> — трёх самых важных свойств flex-элементов.
		</p>
	</div>
	<div class="table-wrap">
		<table class="table">
			<thead>
				<tr>
					<th>Полная запись</th>
					<th>Описание</th>
					<th>Значение по умолчанию</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><span class="td__prop">flex-grow</span></td>
					<td class="td__description">
						Насколько элемент увеличивается относительно других,
						когда есть свободное пространство
					</td>
					<td><span class="td__val">0</span></td>
				</tr>
				<tr>
					<td><span class="td__prop">flex-shrink</span></td>
					<td class="td__description">
						Насколько элемент сжимается относительно других, когда
						пространства недостаточно
					</td>
					<td><span class="td__val">1</span></td>
				</tr>
				<tr>
					<td><span class="td__prop">flex-basis</span></td>
					<td class="td__description">
						Базовый размер до распределения свободного пространства
					</td>
					<td><span class="td__val">auto</span></td>
				</tr>
			</tbody>
		</table>
	</div>
</section>

<section class="section" id="s7">
	<h2 class="section__header">
		<span class="section__number">07</span> Быстрая проверка
	</h2>
	<div class="quiz">
		<div class="quiz__lbl">🧠 Проверь свои знания</div>
		<div class="quiz__question">
			Какое CSS-свойство выравнивает flex-элементы вдоль
			<em>главной оси</em>?
		</div>
		<div class="quiz__opts">
			<div class="quiz__opt">
				<span class="quiz__letter">A</span
				><code
					style="
						font-family: var(--mono);
						font-size: 11px;
						background: rgba(255, 255, 255, 0.05);
						padding: 2px 6px;
						border-radius: 3px;
					"
					>align-items</code
				>
			</div>
			<div class="quiz__opt">
				<span class="quiz__letter">B</span
				><code
					style="
						font-family: var(--mono);
						font-size: 11px;
						background: rgba(255, 255, 255, 0.05);
						padding: 2px 6px;
						border-radius: 3px;
					"
					>justify-content</code
				>
			</div>
			<div class="quiz__opt">
				<span class="quiz__letter">C</span
				><code
					style="
						font-family: var(--mono);
						font-size: 11px;
						background: rgba(255, 255, 255, 0.05);
						padding: 2px 6px;
						border-radius: 3px;
					"
					>flex-direction</code
				>
			</div>
			<div class="quiz__opt">
				<span class="quiz__letter">D</span
				><code
					style="
						font-family: var(--mono);
						font-size: 11px;
						background: rgba(255, 255, 255, 0.05);
						padding: 2px 6px;
						border-radius: 3px;
					"
					>align-self</code
				>
			</div>
		</div>
	</div>
</section>
`,
    tasks: [],
};

export const lessonApi = {
    getLesson: async (_id: string) => {
        return Promise.resolve(LESSON_FOR_TEST);
    },
};
