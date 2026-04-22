import type { Challenge } from '../model/challenge';

export type Language = {
    title: string;
    fullTitle: string;
    codeTemplate: string;
};

export enum SubmissionStatus {
    ACCEPTED = 'accepted',
    WRONG_ANSWER = 'wrong_answer',
    TIME_LIMIT_EXCEED = 'time_limit_exceeded',
    RUNTIME_ERROR = 'runtime_error',
    COMPILER_ERROR = 'compile_error',
}

export interface Submission {
    id: string;
    language: string;
    code: string;
    status: SubmissionStatus;
    passedTests: number;
    totalTests: number;
    runtimeMs: number | null;
    memoryKb: number | null;
    submittedAt: string;
    errorMessage?: string | null;
}

export enum HintType {
    TEXT = 'text',
    CODE = 'code',
    COMPLEXITY = 'complexity',
}

export type HintText = {
    id: string;
    type: HintType.TEXT;
    title: string;
    content: string;
};

export type HintCode = {
    id: string;
    type: HintType.CODE;
    title: string;
    content: string;
    language: string;
};

export type HintComplexity = {
    id: string;
    type: HintType.COMPLEXITY;
    title: string;
    timeComplexity: string;
    spaceComplexity: string;
    content?: string;
};

export type Hint = HintText | HintCode | HintComplexity;

const HINTS: Hint[] = [
    {
        id: '1',
        title: 'Что такое замыкание?',
        type: HintType.TEXT,
        content:
            'Замыкание - это функция, которая запоминает свою лексическую область видимости даже когда функция выполняется вне этой области. Каждое замыкание имеет три области видимости: локальную, область внешней функции и глобальную.',
    },
    {
        id: '2',
        title: 'Пример замыкания в JavaScript',
        type: HintType.CODE,
        content:
            'function outerFunction(x) {\n  function innerFunction(y) {\n    return x + y;\n  }\n  return innerFunction;\n}\n\nconst closure = outerFunction(10);\nconsole.log(closure(5)); // 15',
        language: 'javascript',
    },
    {
        id: '3',
        title: 'Сложность алгоритма бинарного поиска',
        type: HintType.COMPLEXITY,
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        content:
            'Бинарный поиск работает только на отсортированных массивах. На каждом шаге алгоритм делит массив пополам, что обеспечивает логарифмическую временную сложность.',
    },
    {
        id: '4',
        title: 'Что такое Promise?',
        type: HintType.TEXT,
        content:
            'Promise - это объект, представляющий результат асинхронной операции. Promise может находиться в одном из трех состояний: pending (ожидание), fulfilled (выполнен успешно) или rejected (выполнен с ошибкой).',
    },
    {
        id: '5',
        title: 'Пример использования Promise',
        type: HintType.CODE,
        content:
            'const fetchData = () => {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      const data = { id: 1, name: "Example" };\n      resolve(data);\n    }, 1000);\n  });\n};\n\nfetchData().then(data => console.log(data));',
        language: 'javascript',
    },
    {
        id: '6',
        title: 'Сложность быстрой сортировки',
        type: HintType.COMPLEXITY,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        content:
            'Быстрая сортировка использует стратегию "разделяй и властвуй". В среднем случае показывает отличную производительность, но в худшем случае (уже отсортированный массив) временная сложность может быть O(n²).',
    },
    {
        id: '7',
        title: 'Что такое TypeScript?',
        type: HintType.TEXT,
        content:
            'TypeScript - это статически типизированное надмножество JavaScript, которое компилируется в чистый JavaScript. Он добавляет опциональную статическую типизацию, классы, интерфейсы и другие возможности для масштабируемой разработки.',
    },
    {
        id: '8',
        title: 'Пример интерфейса в TypeScript',
        type: HintType.CODE,
        content:
            'interface User {\n  id: number;\n  name: string;\n  email: string;\n  age?: number;\n}\n\nconst getUser = (user: User): string => {\n  return `User: ${user.name}, Email: ${user.email}`;\n};',
        language: 'typescript',
    },
    {
        id: '9',
        title: 'Сложность обхода графа в глубину (DFS)',
        type: HintType.COMPLEXITY,
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        content:
            'DFS (Depth-First Search) используется для обхода или поиска в графах. Временная сложность зависит от количества вершин (V) и ребер (E), а пространственная - от глубины рекурсии или стека.',
    },
    {
        id: '10',
        title: 'Что такое React хуки?',
        type: HintType.TEXT,
        content:
            'React хуки - это функции, которые позволяют использовать состояние и другие возможности React в функциональных компонентах. Основные хуки: useState для управления состоянием, useEffect для побочных эффектов, useContext для контекста.',
    },
];

const CHALLENGE_TEST: Challenge = {
    id: '1',
    title: 'Сумма двух чисел',
    topics: ['массивы', 'хеш-таблица', 'алгоритмы'],
    tags: ['two sum', 'поиск', 'hash map'],
    difficulty: 'easy',
    xpReward: 80,
    descriptionMD: `<div class="prob-section">
        <div class="prob-text">
          Дан массив целых чисел <code>nums</code> и целое число <code>target</code>. Верните <em>индексы двух чисел, которые в сумме дают</em> <code>target</code>.<br><br>
          Вы можете предположить, что каждый входной набор имеет <strong>ровно одно решение</strong>, и вы не можете использовать один и тот же элемент дважды.<br><br>
          Вы можете вернуть ответ в любом порядке.
        </div>
      </div>

      <div class="prob-section">
        <div class="prob-h">// примеры</div>
        <div class="example">
          <div class="ex-label">Пример 1</div>
          <div class="ex-row"><span class="ex-key">Вход:&nbsp;</span><span class="ex-val">nums = [2,7,11,15], target = 9</span></div>
          <div class="ex-row"><span class="ex-key">Выход: </span><span class="ex-val">[0,1]</span></div>
          <div class="ex-expl">Потому что nums[0] + nums[1] = 2 + 7 = 9, возвращаем [0, 1].</div>
        </div>
        <div class="example">
          <div class="ex-label">Пример 2</div>
          <div class="ex-row"><span class="ex-key">Вход:&nbsp;</span><span class="ex-val">nums = [3,2,4], target = 6</span></div>
          <div class="ex-row"><span class="ex-key">Выход: </span><span class="ex-val">[1,2]</span></div>
        </div>
        <div class="example">
          <div class="ex-label">Пример 3</div>
          <div class="ex-row"><span class="ex-key">Вход:&nbsp;</span><span class="ex-val">nums = [3,3], target = 6</span></div>
          <div class="ex-row"><span class="ex-key">Выход: </span><span class="ex-val">[0,1]</span></div>
        </div>
      </div>

      <div class="prob-section">
        <div class="prob-h">// ограничения</div>
        <div class="constraint"><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></div>
        <div class="constraint"><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></div>
        <div class="constraint"><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></div>
        <div class="constraint">Существует только одно правильное решение.</div>
      </div>

      <div class="prob-section">
        <div class="prob-h">// дополнительно (follow-up)</div>
        <div class="prob-text" style="font-size:12px;color:var(--muted)">Можете ли вы предложить алгоритм со сложностью меньше <code>O(n²)</code>?</div>
      </div>

      <div class="prob-section">
        <div class="prob-h">// статистика принятия</div>
        <div class="stat-row"><span class="sr-label">Процент принятия</span><span class="sr-val" style="color:var(--green)">49.1%</span></div>
        <div class="stat-row"><span class="sr-label">Всего решений</span><span class="sr-val">12.4M</span></div>
        <div class="stat-row"><span class="sr-label">Награда XP</span><span class="sr-val" style="color:var(--yellow)">+80 XP</span></div>
      </div>`,
    tests: [
        {
            id: '1',
            inputData: ['[2,7,11,15]', '9'],
            outputData: ['[0,1]'],
            order: 1,
        },
        {
            id: '2',
            inputData: ['[3,2,4]', '6'],
            outputData: ['[1,2]'],
            order: 2,
        },
        {
            id: '3',
            inputData: ['[3,3]', '6'],
            outputData: ['[0,1]'],
            order: 3,
        },
        {
            id: '4',
            inputData: ['[1,2]', '3'],
            outputData: ['[0,1]'],
            order: 4,
        },
        {
            id: '5',
            inputData: ['[-1,-2,-3,-4,-5]', '-8'],
            outputData: ['[2,4]'],
            order: 5,
        },
    ],
};

export const SUBMISSIONS: Submission[] = [
    {
        id: '1',
        language: 'python',
        code: 'def solution(arr):\n    return sorted(arr)',
        status: SubmissionStatus.ACCEPTED,
        passedTests: 10,
        totalTests: 10,
        runtimeMs: 45,
        memoryKb: 10240,
        submittedAt: '2024-01-15T10:30:00Z',
        errorMessage: null,
    },
    {
        id: '2',
        language: 'javascript',
        code: 'function solution(arr) {\n    return arr.sort((a,b) => a-b);\n}',
        status: SubmissionStatus.WRONG_ANSWER,
        passedTests: 7,
        totalTests: 10,
        runtimeMs: 32,
        memoryKb: 8192,
        submittedAt: '2024-01-15T11:15:00Z',
        errorMessage: 'Failed on test case #8: Expected [1,2,3,4,5] but got [1,2,3,5,4]',
    },
    {
        id: '3',
        language: 'java',
        code: 'public int[] solution(int[] arr) {\n    Arrays.sort(arr);\n    return arr;\n}',
        status: SubmissionStatus.TIME_LIMIT_EXCEED,
        passedTests: 5,
        totalTests: 10,
        runtimeMs: 2000,
        memoryKb: 65536,
        submittedAt: '2024-01-15T12:00:00Z',
        errorMessage: 'Time limit exceeded on test case #6',
    },
    {
        id: '4',
        language: 'cpp',
        code: 'vector<int> solution(vector<int>& arr) {\n    sort(arr.begin(), arr.end());\n    return arr;\n}',
        status: SubmissionStatus.RUNTIME_ERROR,
        passedTests: 3,
        totalTests: 10,
        runtimeMs: 15,
        memoryKb: 4096,
        submittedAt: '2024-01-15T13:20:00Z',
        errorMessage: 'Segmentation fault (core dumped)',
    },
    {
        id: '5',
        language: 'python',
        code: 'def solution(arr):\n    # Неправильная реализация\n    return arr',
        status: SubmissionStatus.COMPILER_ERROR,
        passedTests: 0,
        totalTests: 10,
        runtimeMs: null,
        memoryKb: null,
        submittedAt: '2024-01-15T14:45:00Z',
        errorMessage: 'SyntaxError: invalid syntax at line 2',
    },
    {
        id: '6',
        language: 'typescript',
        code: 'const solution = (arr: number[]): number[] => {\n    return [...arr].sort((a,b) => a - b);\n};',
        status: SubmissionStatus.ACCEPTED,
        passedTests: 15,
        totalTests: 15,
        runtimeMs: 28,
        memoryKb: 9216,
        submittedAt: '2024-01-16T09:00:00Z',
        errorMessage: null,
    },
    {
        id: '7',
        language: 'go',
        code: 'func solution(arr []int) []int {\n    sort.Ints(arr)\n    return arr\n}',
        status: SubmissionStatus.WRONG_ANSWER,
        passedTests: 12,
        totalTests: 15,
        runtimeMs: 18,
        memoryKb: 3072,
        submittedAt: '2024-01-16T10:30:00Z',
        errorMessage: 'Wrong answer on test case #13',
    },
    {
        id: '8',
        language: 'rust',
        code: 'fn solution(mut arr: Vec<i32>) -> Vec<i32> {\n    arr.sort();\n    arr\n}',
        status: SubmissionStatus.ACCEPTED,
        passedTests: 20,
        totalTests: 20,
        runtimeMs: 12,
        memoryKb: 2048,
        submittedAt: '2024-01-16T11:15:00Z',
        errorMessage: null,
    },
    {
        id: '9',
        language: 'python',
        code: 'def solution(arr):\n    # Неэффективная реализация\n    for i in range(len(arr)):\n        for j in range(len(arr)-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr',
        status: SubmissionStatus.TIME_LIMIT_EXCEED,
        passedTests: 8,
        totalTests: 20,
        runtimeMs: 3000,
        memoryKb: 5120,
        submittedAt: '2024-01-16T12:00:00Z',
        errorMessage: 'Time limit exceeded on large input',
    },
    {
        id: '10',
        language: 'javascript',
        code: 'function solution(arr) {\n    return arr.sort(); // Ошибка: сортирует как строки\n}',
        status: SubmissionStatus.WRONG_ANSWER,
        passedTests: 5,
        totalTests: 15,
        runtimeMs: 25,
        memoryKb: 7168,
        submittedAt: '2024-01-16T13:45:00Z',
        errorMessage: 'Sorting numbers as strings leads to incorrect order',
    },
    {
        id: '11',
        language: 'csharp',
        code: 'public int[] Solution(int[] arr) {\n    Array.Sort(arr);\n    return arr;\n}',
        status: SubmissionStatus.ACCEPTED,
        passedTests: 25,
        totalTests: 25,
        runtimeMs: 35,
        memoryKb: 15360,
        submittedAt: '2024-01-17T08:00:00Z',
        errorMessage: null,
    },
    {
        id: '12',
        language: 'php',
        code: 'function solution($arr) {\n    sort($arr);\n    return $arr;\n}',
        status: SubmissionStatus.COMPILER_ERROR,
        passedTests: 0,
        totalTests: 10,
        runtimeMs: null,
        memoryKb: null,
        submittedAt: '2024-01-17T09:30:00Z',
        errorMessage: "Parse error: syntax error, unexpected '$'",
    },
    {
        id: '13',
        language: 'swift',
        code: 'func solution(_ arr: [Int]) -> [Int] {\n    return arr.sorted()\n}',
        status: SubmissionStatus.ACCEPTED,
        passedTests: 18,
        totalTests: 18,
        runtimeMs: 22,
        memoryKb: 6144,
        submittedAt: '2024-01-17T10:15:00Z',
        errorMessage: null,
    },
    {
        id: '14',
        language: 'ruby',
        code: 'def solution(arr)\n    arr.sort\nend',
        status: SubmissionStatus.RUNTIME_ERROR,
        passedTests: 2,
        totalTests: 10,
        runtimeMs: 8,
        memoryKb: 1024,
        submittedAt: '2024-01-17T11:00:00Z',
        errorMessage: 'NoMethodError: undefined method `sort` for nil:NilClass',
    },
    {
        id: '15',
        language: 'kotlin',
        code: 'fun solution(arr: IntArray): IntArray {\n    arr.sort()\n    return arr\n}',
        status: SubmissionStatus.ACCEPTED,
        passedTests: 30,
        totalTests: 30,
        runtimeMs: 19,
        memoryKb: 8192,
        submittedAt: '2024-01-17T12:30:00Z',
        errorMessage: null,
    },
];

const RESULT_STATS = {
    runtime: {
        time: '10',
        beats: '25',
    },
    memory: {
        volume: '25',
        beats: '86',
    },
};

const LANGUAGES: Language[] = [
    {
        title: 'python',
        fullTitle: 'Python 3',
        codeTemplate: `n = int(intput())
print(n)
`,
    },
    {
        title: 'javascript',
        fullTitle: 'JavaScript',
        codeTemplate: `n = prompt();
console.log(n);
`,
    },
];

const DIFFICULTY_RESULTS = {
    memory: 'O(n)',
    time: 'O(n)',
};

export const challengeApi = {
    getChallenge: async () => {
        return Promise.resolve(CHALLENGE_TEST);
    },

    getChallengeResults: async () => {
        return Promise.resolve(RESULT_STATS);
    },

    getLanguages: async () => {
        return Promise.resolve(LANGUAGES);
    },

    getSubmissions: async () => {
        return Promise.resolve(SUBMISSIONS);
    },

    getHints: async () => {
        return Promise.resolve(HINTS);
    },

    getDifficultyResults: async () => {
        return Promise.resolve(DIFFICULTY_RESULTS);
    },
};
