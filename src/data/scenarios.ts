/**
 * 8 Realistic Classroom Conflict Scenarios for Elementary 5th-6th Graders
 */

export type ConflictStyle = 'tiger' | 'hedgehog' | 'rabbit' | 'dolphin';

export interface ChoiceOption {
  id: string;
  style: ConflictStyle;
  styleLabel: string;
  text: string;
  heartChange: number; // e.g. -30, -10, +30
  friendReaction: {
    avatarMood: 'happy' | 'touched' | 'shocked' | 'angry' | 'sulking' | 'awkward';
    dialogue: string;
    innerThought: string;
    explanation: string;
  };
}

export interface IMessageBlankItem {
  id: string;
  label: string;
  isCorrect: boolean;
  hint: string;
}

export interface IMessageStep {
  stepNumber: 1 | 2 | 3;
  stepName: string; // e.g. "1단계: 사실(상황) 말하기", "2단계: 내 감정/영향 말하기", "3단계: 구체적 바람/부탁"
  promptPrefix: string; // e.g. "네가 "
  promptSuffix: string; // e.g. " 때,"
  options: IMessageBlankItem[];
  pedagogicalTip: string;
}

export interface Scenario {
  id: number;
  title: string;
  category: string;
  location: string;
  friend: {
    name: string;
    avatar: string;
    color: string;
    role: string;
  };
  situation: string;
  friendInitialQuote: string;
  initialHeart: number; // default starting heart (e.g. 50%)
  choices: ChoiceOption[];
  iMessage: {
    idealSentence: string;
    steps: IMessageStep[];
    resolutionSummary: string;
  };
}

export const CONFLICT_STYLES_INFO: Record<
  ConflictStyle,
  {
    name: string;
    badge: string;
    animal: string;
    color: string;
    tagline: string;
    summary: string;
    strength: string;
    caution: string;
    solutionTip: string;
  }
> = {
  tiger: {
    name: '공격형 (당당한 호랑이)',
    badge: '호랑이형',
    animal: '🐯',
    color: 'from-amber-500 to-red-500',
    tagline: '“내 생각은 바로 말해야 직성이 풀려!”',
    summary: '자신의 억울함이나 주장을 주저 없이 당당하게 표현하는 용기가 있어요. 하지만 순간적으로 화를 내거나 비난하는 말을 쓰면 상대방에게 깊은 상처를 주고 갈등이 커질 수 있어요.',
    strength: '자기주장이 확실하고 솔직하여 억울하게 참지 않아요.',
    caution: '상대방의 마음을 살피기 전에 공격적인 말투가 먼저 나와 친구를 적으로 만들 수 있어요.',
    solutionTip: '화가 치밀 땐 바로 말하지 말고 "3초 심호흡(씁-하)" 후, 비난의 말 대신 "나 전달법"으로 나의 속상한 마음만 담백하게 전달해 보세요.'
  },
  hedgehog: {
    name: '수동공격·냉전형 (가시돋친 고슴도치)',
    badge: '고슴도치형',
    animal: '🦔',
    color: 'from-purple-500 to-indigo-600',
    tagline: '“직접 말은 안 하지만, 나 삐친 거 몰라?”',
    summary: '겉으로는 갈등을 피하고 조용히 넘어가는 것처럼 보이지만, 속으로는 화와 서운함을 꽁꽁 쌓아두다 뒷담화를 하거나 쌀쌀맞게 굴어 친구를 당황스럽게 만들 수 있어요.',
    strength: '충동적인 몸싸움이나 큰 말다툼을 일으키지 않고 상황을 지켜봐요.',
    caution: '문제를 직접 풀지 않고 비꼬거나 소외시키면 오해가 눈덩이처럼 커져 친구 관계가 회복하기 어려워져요.',
    solutionTip: '친구는 여러분이 왜 화났는지 진짜 이유를 모를 때가 많아요. 혼자 가시를 세우기 전에 "사실은 그때 서운했어"라고 솔직한 문을 먼저 열어주세요.'
  },
  rabbit: {
    name: '순응·소극형 (마음 여린 토끼)',
    badge: '토끼형',
    animal: '🐰',
    color: 'from-emerald-400 to-teal-500',
    tagline: '“나만 꾹 참으면 아무 일도 안 생길 거야...”',
    summary: '친구와의 평화와 배려를 가장 소중히 생각하는 따뜻한 친구예요. 하지만 친구의 기분을 맞추려다 내 감정을 무시하고 속으로만 끙끙 앓아 혼자 마음의 병이 생길 수 있어요.',
    strength: '친구의 기분을 세심하게 살피고 평화를 지키려는 따뜻한 배려심이 뛰어나요.',
    caution: '내 정당한 권리나 아픈 마음을 말하지 못해 계속 억울하거나 부당한 일을 겪을 수 있어요.',
    solutionTip: '내 감정도 친구의 감정만큼 소중해요! "싫어"나 "속상해"라고 정중하게 말하는 것은 싸우자는 것이 아니라 건강한 우정을 지키는 시작입니다.'
  },
  dolphin: {
    name: '존중·소통형 (지혜로운 돌고래)',
    badge: '돌고래형',
    animal: '🐬',
    color: 'from-sky-500 to-blue-600',
    tagline: '“내 마음도 친구의 마음도 둘 다 소중해!”',
    summary: '친구의 체면과 기분을 지켜주면서도, 자신의 생각과 바람을 분명하고 정중하게 표현하는 이상적인 갈등 해결 마스터예요!',
    strength: '비난 없이 상대방의 협조를 이끌어내며, 갈등을 겪은 뒤 오히려 우정이 더 단단해져요.',
    caution: '상대방이 계속해서 무례하거나 막무가내일 때는 단호하게 단호한 경계를 긋고 선생님이나 어른의 도움을 요청하는 것도 필요해요.',
    solutionTip: '지금처럼 "나 전달법"을 계속 실천하고, 주변에서 갈등으로 힘들어하는 친구들에게도 든든한 평화의 징검다리가 되어주세요!'
  }
};

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: '급식실 줄 서기 새치기',
    category: '학교 규칙 & 배려',
    location: '점심시간 급식실 배식대 앞',
    friend: {
      name: '민우',
      avatar: '👦',
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      role: '같은 반 친구'
    },
    situation: '10분 넘게 배고픔을 참으며 급식 줄을 서서 이제 막 식판을 잡으려는 순간, 뒤늦게 달려온 민우가 "어! 나 여기 좀 끼워줘ㅋㅋ 오늘 떡볶이 나온대!"라며 내 앞으로 불쑥 끼어들었어요. 뒤에 선 친구들이 수군거리며 불만을 터뜨립니다.',
    friendInitialQuote: '“야 나 배고파서 쓰러질 것 같아ㅋㅋ 나 한 명쯤은 봐줄 거지?”',
    initialHeart: 50,
    choices: [
      {
        id: '1-a',
        style: 'tiger',
        styleLabel: '공격형 (버럭 분노)',
        text: '“야! 너만 배고프냐? 양심도 없냐? 당장 뒤로 꺼져!” 하며 민우 어깨를 거칠게 밀친다.',
        heartChange: -30,
        friendReaction: {
          avatarMood: 'angry',
          dialogue: '“뭘 밀치고 난리야? 그냥 말로 하면 되지 사람 무안하게 소리를 지르고 그래?!”',
          innerThought: '다른 애들도 다 보는데 소리치며 미니까 너무 쪽팔리고 기분 더럽다.',
          explanation: '공격적인 말과 신체 접촉은 잘못한 친구의 반성 대신 수치심과 반발심을 불러일으켜 더 큰 몸싸움으로 번질 수 있어요.'
        }
      },
      {
        id: '1-b',
        style: 'rabbit',
        styleLabel: '소극·순응형 (꾹 참기)',
        text: '뒤에 선 친구들의 눈총이 따갑지만, 어색해질까 봐 아무 말도 못한 채 고개만 푹 숙이고 자리를 내어준다.',
        heartChange: -5,
        friendReaction: {
          avatarMood: 'awkward',
          dialogue: '“오 땡큐~ 역시 넌 착해ㅋㅋ 다음에도 부탁한다!”',
          innerThought: '얘는 아무 말 안 하니까 다음에도 또 새치기해도 되겠네.',
          explanation: '부당한 상황에서 침묵하면 상대방은 자신의 행동이 괜찮은 줄 착각하고, 정작 내 마음속에는 깊은 억울함과 응어리가 남게 돼요.'
        }
      },
      {
        id: '1-c',
        style: 'hedgehog',
        styleLabel: '수동공격형 (뒷담화와 눈흘김)',
        text: '민우를 째려보며 뒤 친구에게 “진짜 뻔뻔하다, 양심 밥 말아먹었네”라고 민우가 다 들리게 웅성거린다.',
        heartChange: -20,
        friendReaction: {
          avatarMood: 'sulking',
          dialogue: '“야, 들리거든? 할 말 있으면 대놓고 하든가 왜 뒤에서 수군거리는데?”',
          innerThought: '앞에선 암말 못 하면서 뒤에서 욕하니까 얄밉고 괘씸하다.',
          explanation: '간접적으로 비꼬거나 뒷담화를 하면 원래의 문제(새치기)보다 태도 때문에 감정싸움이 2차로 번져요.'
        }
      },
      {
        id: '1-d',
        style: 'dolphin',
        styleLabel: '존중·소통형 (정중하고 단호한 요청)',
        text: '“민우야, 우리 모두 오래 줄 서서 기다렸거든. 뒤 친구들도 곤란해하니까 맨 뒤로 가서 서 줄래?”',
        heartChange: +35,
        friendReaction: {
          avatarMood: 'touched',
          dialogue: '“아... 미안, 너무 배고파서 눈이 멀었나 봐. 뒤로 가서 설게!”',
          innerThought: '친구들 앞에서 망신 주지 않고 침착하게 말해주니까 부끄럽지만 수긍하게 된다.',
          explanation: '공격하지 않고 상대방의 행동(새치기)과 상황을 사실대로 짚어주면 상대방도 자신의 실수를 인정하고 올바르게 행동할 용기를 얻어요.'
        }
      }
    ],
    iMessage: {
      idealSentence: '“민우야, 네가 줄을 서지 않고 내 앞에 끼어들었을 때, 뒤 친구들 눈치도 보이고 공정하지 않아서 마음이 불편하고 난처했어. 앞으로는 모두를 위해 맨 뒤로 가서 차례대로 서 줬으면 좋겠어.”',
      resolutionSummary: '‘너는 예의가 없어(너 전달법)’ 대신 ‘내 앞에 끼어들었을 때(상황) 난처했어(감정)’라고 말하면 상대의 방어벽이 허물어집니다.',
      steps: [
        {
          stepNumber: 1,
          stepName: '1단계: 사실(상황) 말하기',
          promptPrefix: '“민우야, 네가 ',
          promptSuffix: '”',
          options: [
            { id: '1-1-correct', label: '차례를 지키지 않고 내 앞에 불쑥 끼어들었을 때,', isCorrect: true, hint: '비난을 빼고 일어난 행동 사실만 짚어주는 것이 좋아요.' },
            { id: '1-1-wrong1', label: '항상 이기적으로 남의 배려를 무시하고 욕심부릴 때,', isCorrect: false, hint: '‘항상’, ‘이기적으로’ 같은 단어는 상대를 방어적으로 만듭니다.' },
            { id: '1-1-wrong2', label: '개념 없이 뻔뻔하게 굴 때,', isCorrect: false, hint: '인격 모독 단어는 대화를 차단해요.' }
          ],
          pedagogicalTip: '‘너는 원래 이래’가 아니라 ‘이번에 일어난 구체적인 행동’만 사진 찍듯 담백하게 말해요.'
        },
        {
          stepNumber: 2,
          stepName: '2단계: 나의 감정/영향 말하기',
          promptPrefix: '“나는 뒤 친구들 눈치도 보이고 규칙이 지켜지지 않아 ',
          promptSuffix: '”',
          options: [
            { id: '1-2-correct', label: '마음이 많이 불편하고 난처했어.', isCorrect: true, hint: '내가 느낀 솔직하고 진솔한 감정을 담담히 표현해요.' },
            { id: '1-2-wrong1', label: '네가 진짜 한심하고 밥맛 떨어졌어.', isCorrect: false, hint: '감정 표현이 아니라 상대를 깎아내리는 평가예요.' },
            { id: '1-2-wrong2', label: '그냥 아무 생각 없고 괜찮았어.', isCorrect: false, hint: '내 감정을 속이면 문제가 해결되지 않아요.' }
          ],
          pedagogicalTip: '‘화나서 죽는 줄 알았어’보다는 그 밑에 있는 ‘난처함’, ‘불편함’을 표현할 때 상대의 공감을 얻습니다.'
        },
        {
          stepNumber: 3,
          stepName: '3단계: 구체적인 바람/부탁 말하기',
          promptPrefix: '“앞으로는 ',
          promptSuffix: '”',
          options: [
            { id: '1-3-correct', label: '다른 친구들처럼 맨 뒤로 가서 차례대로 줄을 서 줬으면 좋겠어.', isCorrect: true, hint: '상대방이 지금 당장 실천할 수 있는 명확한 행동을 부탁해요.' },
            { id: '1-3-wrong1', label: '다시는 내 눈앞에 얼씬도 하지 마라.', isCorrect: false, hint: '위협적인 말은 갈등만 깊어지게 해요.' },
            { id: '1-3-wrong2', label: '네가 알아서 눈치껏 행동해.', isCorrect: false, hint: '구체적인 행동 대안이 없으면 상대는 무엇을 해야 할지 몰라요.' }
          ],
          pedagogicalTip: '‘~하지 마!’(금지)보다 ‘~해 줬으면 좋겠어’(긍정적 바람)가 훨씬 효과적입니다.'
        }
      ]
    }
  },
  {
    id: 2,
    title: '모둠 과제 무임승차',
    category: '협동 & 책임감',
    location: '교실 방과 후 모둠 활동 시간',
    friend: {
      name: '서연',
      avatar: '👧',
      color: 'bg-rose-100 text-rose-700 border-rose-200',
      role: '사회 모둠원'
    },
    situation: '내일까지 제출해야 하는 사회 역사 신문 만들기 모둠 과제예요. 다른 모둠원들은 자료를 찾고 오려 붙이느라 바쁜데, 서연이는 "나 미술도 못하고 역사도 싫어~"라며 폰 게임만 만지작거리고 전혀 돕지 않고 있어요.',
    friendInitialQuote: '“너희가 알아서 잘하잖아~ 난 이름만 올려주면 안 돼? 귀찮은데ㅎㅎ”',
    initialHeart: 50,
    choices: [
      {
        id: '2-a',
        style: 'tiger',
        styleLabel: '공격형 (극단적 통보)',
        text: '“너 진짜 뻔뻔하다! 과제 보고서에서 네 이름 파버리고 선생님한테 다 일러바칠 거야!” 소리친다.',
        heartChange: -25,
        friendReaction: {
          avatarMood: 'angry',
          dialogue: '“참나, 내가 안 하겠다고 했어? 좀 쉬다 하려고 했는데 왜 소리를 지르고 난리야? 안 해!”',
          innerThought: '모둠장이라고 완장 차고 명령하네. 기분 나빠서 손가락 하나 까딱 안 할래.',
          explanation: '협박이나 이름 삭제 통보는 서연이의 방어심을 자극해 아예 과제를 포기하게 만들 수 있어요.'
        }
      },
      {
        id: '2-b',
        style: 'rabbit',
        styleLabel: '소극·순응형 (혼자 독박 쓰기)',
        text: '갈등이 생기면 모둠 분위기 망칠까 봐 말도 못 하고, 밤늦게 집에 가서 서연이 몫까지 혼자 다 해버린다.',
        heartChange: 0,
        friendReaction: {
          avatarMood: 'awkward',
          dialogue: '“와 대박! 너 진짜 착하다. 덕분에 편하게 꿀 빨았네~ 고마워!”',
          innerThought: '내가 안 해도 알아서 다 해주네. 다음 모둠 활동 때도 이 친구랑 해야지~',
          explanation: '내가 모든 짐을 떠안으면 몸과 마음이 지치고, 친구에게도 책임감을 기를 기회를 빼앗게 됩니다.'
        }
      },
      {
        id: '2-c',
        style: 'hedgehog',
        styleLabel: '수동공격형 (SNS/단톡방 비꼬기)',
        text: '모둠 단톡방에 “누구는 손 없어서 폰 게임만 하고~ 참 인생 편하게 사네^^”라고 저격 글을 올린다.',
        heartChange: -20,
        friendReaction: {
          avatarMood: 'sulking',
          dialogue: '“저격 글 올린 거 나 보라고 한 거냐? 진짜 유치하게 군다.”',
          innerThought: '다른 애들 다 있는 단톡방에서 망신 주다니... 절대 용서 못 해.',
          explanation: '공개적인 비꼼과 저격은 모둠 전체의 분위기를 냉각시키고 해결보다 복수심만 키웁니다.'
        }
      },
      {
        id: '2-d',
        style: 'dolphin',
        styleLabel: '존중·소통형 (역할 세분화와 동참 유도)',
        text: '“서연아, 내일까지라 우리 모두 부담이 커. 네가 기사 글 쓰는 게 부담스럽다면 사진 자료 인쇄하고 배치하는 거 먼저 맡아줄래?”',
        heartChange: +30,
        friendReaction: {
          avatarMood: 'touched',
          dialogue: '“아... 뭘 해야 할지 막막해서 폰만 봤는데, 사진 찾는 거랑 오리는 건 내가 해볼게!”',
          innerThought: '무작정 화내지 않고 내가 할 수 있는 쉬운 일을 구체적으로 제안해주니 고맙다.',
          explanation: '친구가 망설이는 이유(막막함)를 고려해 구체적이고 부담 없는 역할을 제안하면 참여율이 급격히 올라갑니다.'
        }
      }
    ],
    iMessage: {
      idealSentence: '“서연아, 과제 마감이 내일인데 모둠 활동에 참여하지 않고 있을 때, 혼자 다 해야 할까 봐 부담스럽고 속상했어. 우리가 역할을 나누어 줄 테니 작은 부분이라도 함께 힘을 보태줬으면 좋겠어.”',
      resolutionSummary: '비난하기 전에 구체적인 역할(Action item)을 주며 내 부담감을 솔직히 털어놓는 것이 협력의 비결입니다.',
      steps: [
        {
          stepNumber: 1,
          stepName: '1단계: 사실(상황) 말하기',
          promptPrefix: '“서연아, 모둠 과제 마감이 얼마 안 남았는데 ',
          promptSuffix: '”',
          options: [
            { id: '2-1-correct', label: '함께 회의하지 않고 혼자 다른 활동을 하고 있을 때,', isCorrect: true, hint: '객관적인 행동 사실만 짚어주세요.' },
            { id: '2-1-wrong1', label: '너처럼 게으르고 무책임하게 굴 때,', isCorrect: false, hint: '인격 비난은 협동을 깨뜨립니다.' },
            { id: '2-1-wrong2', label: '네가 뻔뻔하게 놀고먹으려 할 때,', isCorrect: false, hint: '자극적인 단어는 상대의 귀를 닫게 만듭니다.' }
          ],
          pedagogicalTip: '‘너 때문에 망했어’가 아니라 ‘지금 참여가 멈춰 있는 상황’을 짚어주세요.'
        },
        {
          stepNumber: 2,
          stepName: '2단계: 나의 감정/영향 말하기',
          promptPrefix: '“마감 시간을 못 맞출까 봐 불안하고 ',
          promptSuffix: '”',
          options: [
            { id: '2-2-correct', label: '혼자 많은 부담을 떠안게 될까 봐 답답하고 속상했어.', isCorrect: true, hint: '과제로 인해 겪는 나의 심리적 무게를 진솔하게 전달해요.' },
            { id: '2-2-wrong1', label: '너 같은 애랑 모둠 된 게 저주 같아서 짜증 났어.', isCorrect: false, hint: '모욕적인 말은 문제 해결에 아무 도움이 안 돼요.' },
            { id: '2-2-wrong2', label: '솔직히 너 없어도 우리가 다 할 수 있어.', isCorrect: false, hint: '오히려 친구를 배제하게 만듭니다.' }
          ],
          pedagogicalTip: '‘나의 부담감과 불안감’을 솔직히 공유할 때 친구도 책임감을 느끼기 시작합니다.'
        },
        {
          stepNumber: 3,
          stepName: '3단계: 구체적인 바람/부탁 말하기',
          promptPrefix: '“우리가 각자 잘하는 걸로 역할을 나눠줄 테니, ',
          promptSuffix: '”',
          options: [
            { id: '2-3-correct', label: '자료 조사나 꾸미기 중 하나를 맡아서 함께 끝내줬으면 좋겠어.', isCorrect: true, hint: '선택할 수 있는 명확한 역할을 제안해요.' },
            { id: '2-3-wrong1', label: '그냥 아무것도 하지 말고 가만히나 있어 줘.', isCorrect: false, hint: '배제는 상처와 불화를 낳습니다.' },
            { id: '2-3-wrong2', label: '내일까지 혼자 보고서 10장 다 써와.', isCorrect: false, hint: '과도한 요구는 포기를 부릅니다.' }
          ],
          pedagogicalTip: '친구가 바로 실천 가능한 ‘작은 첫 단추’ 역할을 구체적으로 부탁하세요.'
        }
      ]
    }
  },
  {
    id: 3,
    title: '단톡방 은근한 소외와 뒷말',
    category: '사이버 교우 관계',
    location: '방과 후 스마트폰 단체 대화방',
    friend: {
      name: '준호',
      avatar: '🧒',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      role: '주요 친구 무리'
    },
    situation: '친한 친구 5명이 모인 단톡방에서 준호와 몇몇 친구가 자기들끼리만 아는 암호 같은 이모티콘을 쓰며 "어제 진짜 대박이었지ㅋㅋ 걔만 없으니까 완전 편함"이라며 낄낄거려요. 누가 봐도 어제 학원 때문에 못 간 나를 빗대는 느낌이에요.',
    friendInitialQuote: '“아ㅋㅋㅋ 어제 우리끼리 놀았던 거 비밀로 하기로 했잖아 쉿!”',
    initialHeart: 50,
    choices: [
      {
        id: '3-a',
        style: 'tiger',
        styleLabel: '공격형 (분노 폭발 저격)',
        text: '“야! 너네 지금 나 들으라고 일부러 그러냐? 치사하게 뒤에서 쑥덕거리지 말고 불만 있으면 면전에 대고 말해!”',
        heartChange: -25,
        friendReaction: {
          avatarMood: 'angry',
          dialogue: '“헐... 왜 혼자 찔려서 급발진함? 네 얘기 한 적도 없는데 피해의식 쩐다 진짜.”',
          innerThought: '찔리긴 하지만 저렇게 따지니까 나도 지기 싫어서 오리발 내밀어야겠다.',
          explanation: '공개 톡방에서 흥분해 따지면 상대방은 발뺌하며 오히려 나를 ‘예민한 사람’으로 몰아갈 위험이 있어요.'
        }
      },
      {
        id: '3-b',
        style: 'rabbit',
        styleLabel: '소극·순응형 (말없이 방 나가기)',
        text: '아무 말도 못 하고 조용히 ‘준호 님이 나갔습니다’ 흔적만 남긴 채 톡방을 나가버리고 방에서 베개에 얼굴을 묻고 운다.',
        heartChange: -10,
        friendReaction: {
          avatarMood: 'awkward',
          dialogue: '“어? 쟤 왜 나갔냐? 뭐 기분 나쁜 거 있나? 분위기 싸해지네...”',
          innerThought: '왜 나갔는지 정확히는 모르겠지만, 괜히 톡방 분위기만 무거워져서 귀찮다.',
          explanation: '이유를 말하지 않고 퇴장하면 친구들은 내 상처의 이유를 정확히 알지 못하고 오해만 깊어질 수 있어요.'
        }
      },
      {
        id: '3-c',
        style: 'hedgehog',
        styleLabel: '수동공격형 (SNS 상태메시지 저격)',
        text: '프로필 상태메시지에 ‘믿었던 친구의 배신... 다 가면이었네^^ 평생 그렇게 살아라’ 적어두고 폰을 꺼버린다.',
        heartChange: -20,
        friendReaction: {
          avatarMood: 'sulking',
          dialogue: '“상메 봤냐? 대놓고 우리 저격하네. 진짜 정떨어진다.”',
          innerThought: '직접 말할 용기도 없으면서 상메로 저러니까 진짜 비호감이다.',
          explanation: '상태메시지나 간접 저격은 반 친구들 전체에 소문만 퍼뜨리고 감정의 골을 극단으로 몰고 갑니다.'
        }
      },
      {
        id: '3-d',
        style: 'dolphin',
        styleLabel: '존중·소통형 (1:1 진솔한 대화 신청)',
        text: '단톡방에서 흥분하지 않고 준호에게 1:1 개인톡을 보내어 “준호야, 단톡방에서 나를 빗대는 듯한 대화를 볼 때 소외감 들고 속상했어. 혹시 나한테 서운한 게 있다면 편하게 말해줄래?”라고 묻는다.',
        heartChange: +35,
        friendReaction: {
          avatarMood: 'touched',
          dialogue: '“헐... 네가 그렇게 느꼈구나. 장난치다 보니 선을 넘었어. 네 욕하려던 건 진짜 아니었어. 미안해!”',
          innerThought: '다른 애들 앞에서 따지지 않고 1:1로 차분하게 물어봐 주니 내 실수가 진심으로 미안해진다.',
          explanation: '단톡방이 아닌 ‘1:1 공간’에서 차분하게 내 감정을 전달하면 상대방도 체면을 구기지 않고 솔직하게 사과할 수 있습니다.'
        }
      }
    ],
    iMessage: {
      idealSentence: '“준호야, 단톡방에서 나만 모르는 이야기로 귓속말하듯 대화할 때, 무리에서 겉도는 것 같고 소외감이 들어 외롭고 서운했어. 앞으로는 함께 있는 단톡방인 만큼 다 같이 어울릴 수 있게 배려해 줬으면 좋겠어.”',
      resolutionSummary: '단톡방 갈등은 여럿이 있는 곳보다 1:1로 차분하게 나의 소외감을 말할 때 가장 안전하고 확실하게 해결됩니다.',
      steps: [
        {
          stepNumber: 1,
          stepName: '1단계: 사실(상황) 말하기',
          promptPrefix: '“준호야, 함께 있는 단톡방에서 ',
          promptSuffix: '”',
          options: [
            { id: '3-1-correct', label: '나만 모르는 이야기나 은근한 눈치를 주는 말을 주고받을 때,', isCorrect: true, hint: '톡방에서 일어난 구체적인 상황을 사실대로 표현해요.' },
            { id: '3-1-wrong1', label: '너희가 비겁하게 날 왕따시키려고 음모를 꾸밀 때,', isCorrect: false, hint: '단정적인 낙인은 대화를 싸움으로 변질시킵니다.' },
            { id: '3-1-wrong2', label: '너희끼리 잘난 척하면서 웃고 떠들 때,', isCorrect: false, hint: '비난 섞인 표현은 상대를 화나게 해요.' }
          ],
          pedagogicalTip: '친구가 한 구체적인 행동 사실만 차분하게 짚어주세요.'
        },
        {
          stepNumber: 2,
          stepName: '2단계: 나의 감정/영향 말하기',
          promptPrefix: '“친구 무리에서 혼자 남겨진 것 같아 ',
          promptSuffix: '”',
          options: [
            { id: '3-2-correct', label: '외롭고 소외감이 느껴져서 마음이 많이 아팠어.', isCorrect: true, hint: '소외감과 슬픔이라는 1차 감정을 솔직히 고백해요.' },
            { id: '3-2-wrong1', label: '너희들이 진짜 한심하고 역겨웠어.', isCorrect: false, hint: '상대를 공격하는 것은 내 감정 전달이 아닙니다.' },
            { id: '3-2-wrong2', label: '아무렇지도 않고 그냥 하찮았어.', isCorrect: false, hint: '방어적으로 센 척하면 친구는 내 아픔을 몰라요.' }
          ],
          pedagogicalTip: '‘화’ 뒤에 숨겨진 진짜 내 감정인 ‘외로움과 서운함’을 이야기하세요.'
        },
        {
          stepNumber: 3,
          stepName: '3단계: 구체적인 바람/부탁 말하기',
          promptPrefix: '“혹시 나한테 서운한 점이 있다면 따로 솔직히 말해주고, 단톡방에서는 ',
          promptSuffix: '”',
          options: [
            { id: '3-3-correct', label: '모두가 함께 나눌 수 있는 대화를 해줬으면 좋겠어.', isCorrect: true, hint: '모두가 배려받는 단톡방 문화를 제안해요.' },
            { id: '3-3-wrong1', label: '내 허락 없이는 아무 이야기도 꺼내지 마.', isCorrect: false, hint: '지나친 통제는 반발을 부릅니다.' },
            { id: '3-3-wrong2', label: '너네 전부 톡방에서 탈퇴하고 반성해.', isCorrect: false, hint: '비현실적인 요구는 해결책이 될 수 없어요.' }
          ],
          pedagogicalTip: '단톡방 친구 모두가 지킬 수 있는 따뜻한 규칙을 부탁해 보세요.'
        }
      ]
    }
  },
  {
    id: 4,
    title: '물건 말없이 빌려가서 망가뜨림',
    category: '물건 존중 & 경계',
    location: '쉬는 시간 우리 반 사물함 앞',
    friend: {
      name: '도윤',
      avatar: '🧑',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      role: '짝꿍'
    },
    situation: '생일 선물로 삼촌에게 어렵게 선물 받은 소중한 한정판 샤프를 필통에 아껴두었는데, 화장실에 다녀와 보니 도윤이가 말도 없이 꺼내 쓰다가 샤프 촉을 바닥에 떨어뜨려 휘어놓고 심도 부러뜨려 놓았어요.',
    friendInitialQuote: '“어? 야 이거 네 거였어? 미안 손에서 미끄러졌네... 샤프 하나 가지고 뭘 그래?”',
    initialHeart: 50,
    choices: [
      {
        id: '4-a',
        style: 'tiger',
        styleLabel: '공격형 (도둑 취급 & 고함)',
        text: '“야 너 도둑이야? 왜 남의 물건을 훔쳐 써? 당장 백화점 가서 똑같은 새 걸로 물어내!” 멱살을 잡듯 소리친다.',
        heartChange: -30,
        friendReaction: {
          avatarMood: 'angry',
          dialogue: '“도둑이라니 말이 너무 심하잖아! 실수로 떨어뜨린 건데 왜 사람을 범죄자 취급해? 안 물어줘!”',
          innerThought: '미안한 마음이 싹 사라진다. 짝꿍끼리 샤프 한번 쓴 걸로 도둑 취급을 해?',
          explanation: '물건에 대한 속상함은 정당하지만, ‘도둑’ 같은 극단적 낙인을 찍으면 상대는 방어적으로 돌아서 배상을 거부하게 됩니다.'
        }
      },
      {
        id: '4-b',
        style: 'rabbit',
        styleLabel: '소극·순응형 (거짓 괜찮음)',
        text: '눈물이 왈칵 쏟아질 것 같지만, 도윤이가 무안해할까 봐 “아... 응, 원래 좀 낡았던 거야... 괜찮아...”라고 거짓말한다.',
        heartChange: 0,
        friendReaction: {
          avatarMood: 'awkward',
          dialogue: '“휴~ 난 또 뭐라고ㅋㅋ 역시 넌 쿨해! 고맙다~”',
          innerThought: '별로 안 아끼던 거였나 보네. 다행이다~',
          explanation: '내 속마음과 달리 거짓으로 괜찮다고 하면 친구는 내 소중한 경계를 알지 못하고 다음에도 함부로 물건을 다루게 됩니다.'
        }
      },
      {
        id: '4-c',
        style: 'hedgehog',
        styleLabel: '수동공격형 (침묵 시위와 악소문)',
        text: '말 한마디 안 하고 도윤이 필통을 쾅 닫아버린 뒤, 다른 친구들에게 “도윤이 손버릇 안 좋으니까 필통 다 숨겨”라고 소문을 낸다.',
        heartChange: -25,
        friendReaction: {
          avatarMood: 'sulking',
          dialogue: '“너 내 욕하고 다닌다며? 진짜 치사하고 음흉하다.”',
          innerThought: '그 자리에서 말하지 않고 뒤에서 날 도둑놈 만들다니... 배신감 든다.',
          explanation: '문제를 당사자와 풀지 않고 제3자에게 부정적 소문을 퍼뜨리면 명예훼손과 따돌림 문제로 번질 수 있어요.'
        }
      },
      {
        id: '4-d',
        style: 'dolphin',
        styleLabel: '존중·소통형 (가치 설명과 수리/보상 협의)',
        text: '“도윤아, 이건 삼촌이 선물해 주신 소중한 물건인데 허락 없이 쓰고 망가져서 너무 속상하고 당황스러워. 쓸 땐 꼭 먼저 물어봐 주고, 촉이 휜 건 수리받거나 방법을 같이 찾아보자.”',
        heartChange: +35,
        friendReaction: {
          avatarMood: 'touched',
          dialogue: '“헉... 그렇게 소중한 건 줄 진짜 몰랐어. 허락 없이 써서 정말 미안해. 내가 부모님께 말씀드려서 AS 센터 알아보거나 꼭 변상할게!”',
          innerThought: '친구 물건을 소중히 다루지 않은 내 잘못이 부끄럽다. 꼭 책임지고 고쳐줘야겠다.',
          explanation: '물건의 특별한 의미를 설명하고 구체적인 해결책을 정중히 제시하면 친구도 양심의 가책을 느끼고 적극적으로 해결하려 합니다.'
        }
      }
    ],
    iMessage: {
      idealSentence: '“도윤아, 네가 내 허락 없이 소중한 샤프를 꺼내 써서 망가뜨렸을 때, 아끼는 물건이라 너무 속상하고 마음이 쿵 내려앉았어. 앞으로는 내 물건을 쓸 때 꼭 먼저 물어봐 주고, 망가진 부분은 같이 책임지고 해결해 줬으면 좋겠어.”',
      resolutionSummary: '‘물건의 소중함’을 차분히 알려주고, ‘앞으로는 미리 묻기’라는 명확한 원칙을 세우는 것이 건강한 친구 관계의 경계입니다.',
      steps: [
        {
          stepNumber: 1,
          stepName: '1단계: 사실(상황) 말하기',
          promptPrefix: '“도윤아, 네가 ',
          promptSuffix: '”',
          options: [
            { id: '4-1-correct', label: '미리 말하지 않고 내 필통에서 샤프를 꺼내 쓰다 떨어뜨렸을 때,', isCorrect: true, hint: '일어난 일의 순서와 객관적 사실을 말해요.' },
            { id: '4-1-wrong1', label: '남의 물건을 거지처럼 훔쳐 가서 망쳐놓았을 때,', isCorrect: false, hint: '비하 단어는 대화를 파탄 냅니다.' },
            { id: '4-1-wrong2', label: '항상 손버릇 나쁘게 아무거나 손댈 때,', isCorrect: false, hint: '과거 일까지 끌어와 일반화하지 마세요.' }
          ],
          pedagogicalTip: '‘훔쳤다’ 대신 ‘미리 말하지 않고 꺼내 쓰다 떨어뜨렸다’처럼 사실만 말해요.'
        },
        {
          stepNumber: 2,
          stepName: '2단계: 나의 감정/영향 말하기',
          promptPrefix: '“정말 아끼고 소중히 여기던 선물이라 ',
          promptSuffix: '”',
          options: [
            { id: '4-2-correct', label: '너무 당황스럽고 속상해서 가슴이 철렁 내려앉았어.', isCorrect: true, hint: '물건에 담긴 내 애정과 상실감을 솔직하게 표현해요.' },
            { id: '4-2-wrong1', label: '네 면상을 한 대 때려주고 싶을 만큼 증오스러웠어.', isCorrect: false, hint: '폭력적인 감정 표출은 역효과를 냅니다.' },
            { id: '4-2-wrong2', label: '별로 상관없고 아무렇지도 않아.', isCorrect: false, hint: '괜찮지 않으면서 괜찮다고 하지 마세요.' }
          ],
          pedagogicalTip: '물건이 망가졌을 때의 ‘속상함’을 감추지 말고 담담하게 드러내세요.'
        },
        {
          stepNumber: 3,
          stepName: '3단계: 구체적인 바람/부탁 말하기',
          promptPrefix: '“앞으로는 내 물건을 쓰기 전에 꼭 먼저 허락을 구해주고, ',
          promptSuffix: '”',
          options: [
            { id: '4-3-correct', label: '고장 난 부분은 수리하거나 배상할 방법을 함께 찾아줬으면 좋겠어.', isCorrect: true, hint: '합리적인 책임과 해결 방법을 제시해요.' },
            { id: '4-3-wrong1', label: '오늘 당장 돈 5만 원 현금으로 뽑아와.', isCorrect: false, hint: '일방적인 금전 요구는 갈등을 악화시켜요.' },
            { id: '4-3-wrong2', label: '내 책상 근처 1미터 안으로 절대 오지 마.', isCorrect: false, hint: '극단적인 격리는 해결책이 아닙니다.' }
          ],
          pedagogicalTip: '앞으로의 규칙(먼저 묻기)과 현재의 수습책(함께 해결하기)을 명확히 전달하세요.'
        }
      ]
    }
  },
  {
    id: 5,
    title: '실수와 신체 별명으로 놀리기',
    category: '언어폭력 & 존중',
    location: '체육 시간 운동장 스탠드',
    friend: {
      name: '지아',
      avatar: '👧',
      color: 'bg-pink-100 text-pink-700 border-pink-200',
      role: '앞자리 친구'
    },
    situation: '체육 시간 이어달리기 도중 발이 엉켜 엉덩방아를 찧었어요. 크게 다치진 않았지만 무안했는데, 지아가 며칠째 쉬는 시간마다 반 친구들 앞에서 엉덩이를 털썩 주저앉는 흉내를 내며 "야! 꽈당 엉덩이 왔냐? ㅋㅋㅋ" 하고 깔깔거리며 놀립니다.',
    friendInitialQuote: '“아 왜 정색해? 그냥 웃기자고 한 장난인데 장난도 못 받아주냐? 노잼ㅋㅋ”',
    initialHeart: 50,
    choices: [
      {
        id: '5-a',
        style: 'tiger',
        styleLabel: '공격형 (외모 비하 맞불)',
        text: '“너는 거울도 안 보냐? 돼지같이 생겨가지고! 너나 똑바로 걸어라!” 상대의 콤플렉스를 공격한다.',
        heartChange: -30,
        friendReaction: {
          avatarMood: 'angry',
          dialogue: '“뭐라고? 너 지금 외모 비하했냐? 내가 언제 너한테 돼지라 그랬어?! 선생님한테 이를 거야!”',
          innerThought: '내가 장난친 건 맞지만 외모 욕을 먹으니 너무 분하다. 쌍방 폭언으로 물고 늘어져야겠다.',
          explanation: '놀림에 욕설이나 콤플렉스 공격으로 맞대응하면 본래 피해자였던 내가 가해자가 되어 쌍방 처벌을 받을 수 있어요.'
        }
      },
      {
        id: '5-b',
        style: 'rabbit',
        styleLabel: '소극·순응형 (억지 미소 짓기)',
        text: '속으로는 쥐구멍에라도 숨고 싶고 수치스럽지만, 쿨해 보이고 싶어서 억지로 어색하게 같이 “하하...” 웃어넘긴다.',
        heartChange: -5,
        friendReaction: {
          avatarMood: 'awkward',
          dialogue: '“거봐ㅋㅋ 너도 웃기지? 야 얘들아 꽈당 엉덩이 또 보여줄게!”',
          innerThought: '같이 웃는 거 보니까 진짜로 재미있어하는 줄 알았다.',
          explanation: '상처받았는데도 억지로 따라 웃으면 가해자는 상대가 좋아하는 줄 알고 놀림의 강도를 더 높이게 됩니다.'
        }
      },
      {
        id: '5-c',
        style: 'hedgehog',
        styleLabel: '수동공격형 (실수 꼬투리 잡기)',
        text: '이를 바득바득 갈며 지아가 수업 시간에 문제 틀리기만을 기다렸다가, 지아가 오답을 말하자 “푸하하! 쟤 뇌 순수한 것 좀 봐!” 비웃는다.',
        heartChange: -20,
        friendReaction: {
          avatarMood: 'sulking',
          dialogue: '“너 진짜 뒤끝 장난 아니다. 쪼잔하게 수업 시간에 망신을 줘?”',
          innerThought: '벼르고 있다가 내 실수를 물고 늘어지니 너무 얄밉고 징글징글하다.',
          explanation: '복수심으로 상대의 실수를 기다려 공격하는 것은 교실을 끝없는 보복의 전쟁터로 만듭니다.'
        }
      },
      {
        id: '5-d',
        style: 'dolphin',
        styleLabel: '존중·소통형 (장난의 경계선 긋기)',
        text: '“지아야, 넌 장난으로 재미있자고 한 말이겠지만 친구들 앞에서 그 별명으로 부를 때 나는 수치스럽고 상처받아. 장난이라도 내가 불쾌하니까 그 별명은 부르지 말아 줘.”',
        heartChange: +35,
        friendReaction: {
          avatarMood: 'touched',
          dialogue: '“어... 난 네가 그렇게까지 상처받는 줄은 몰랐어. 진짜 미안해. 다시는 그 별명 안 부를게!”',
          innerThought: '웃기려고만 생각했지 상대의 입장을 생각 못 했다. 당당하게 선을 그어주니 내 실수를 깨닫게 된다.',
          explanation: '‘너는 나빠’가 아니라 ‘당하는 내 기분이 불쾌하고 아프다’를 명확히 표현하면 장난과 괴롭힘의 경계가 세워집니다.'
        }
      }
    ],
    iMessage: {
      idealSentence: '“지아야, 네가 친구들 앞에서 넘어졌던 실수를 흉내 내며 그 별명을 부를 때, 장난으로 느껴지지 않고 부끄럽고 수치스러웠어. 앞으로는 내 기분을 존중해서 그 별명과 흉내를 멈춰 줬으면 좋겠어.”',
      resolutionSummary: '‘나한테는 장난이 아닌 괴롭힘’이라는 기준을 단호하고 정중하게 밝히는 것이 가장 효과적인 방패입니다.',
      steps: [
        {
          stepNumber: 1,
          stepName: '1단계: 사실(상황) 말하기',
          promptPrefix: '“지아야, 친구들이 많은 곳에서 ',
          promptSuffix: '”',
          options: [
            { id: '5-1-correct', label: '내가 넘어진 행동을 흉내 내며 꽈당 별명을 부를 때,', isCorrect: true, hint: '반복되는 행동을 사실대로 짚어주세요.' },
            { id: '5-1-wrong1', label: '네가 개념 없이 입을 놀리며 인성 파탄 낼 때,', isCorrect: false, hint: '인신공격은 상대의 반발만 부릅니다.' },
            { id: '5-1-wrong2', label: '날 만만하게 보고 온갖 짓을 다 할 때,', isCorrect: false, hint: '모호하고 과장된 표현은 피하세요.' }
          ],
          pedagogicalTip: '지아가 반복하고 있는 구체적인 말과 행동만 담담히 표현하세요.'
        },
        {
          stepNumber: 2,
          stepName: '2단계: 나의 감정/영향 말하기',
          promptPrefix: '“나는 전혀 재미있지 않고 ',
          promptSuffix: '”',
          options: [
            { id: '5-2-correct', label: '창피하고 수치스러워서 마음에 큰 상처가 돼.', isCorrect: true, hint: '내가 느끼는 솔직한 고통을 단호히 밝혀요.' },
            { id: '5-2-wrong1', label: '네가 지구상에서 사라졌으면 좋겠어.', isCorrect: false, hint: '폭력적 저주는 상황을 더 위험하게 만들어요.' },
            { id: '5-2-wrong2', label: '별로 상관없는데 네가 불쌍해 보여.', isCorrect: false, hint: '거짓 우월감은 문제를 해결하지 못해요.' }
          ],
          pedagogicalTip: '‘수치심과 상처’를 명확한 단어로 짚어줄 때 상대도 장난을 멈춥니다.'
        },
        {
          stepNumber: 3,
          stepName: '3단계: 구체적인 바람/부탁 말하기',
          promptPrefix: '“내가 원하지 않는 별명이니, ',
          promptSuffix: '”',
          options: [
            { id: '5-3-correct', label: '앞으로는 그 별명 부르기와 흉내 내기를 당장 멈춰 줬으면 좋겠어.', isCorrect: true, hint: '즉시 중단해야 할 행동을 명확하게 요청해요.' },
            { id: '5-3-wrong1', label: '친구들 앞에서 무릎 꿇고 각서 써.', isCorrect: false, hint: '비현실적인 굴복 요구는 싸움을 키워요.' },
            { id: '5-3-wrong2', label: '너도 똑같이 넘어져서 개망신 당해봐.', isCorrect: false, hint: '보복은 해결책이 아닙니다.' }
          ],
          pedagogicalTip: '‘당장 멈춰줘’라는 명확한 행동의 정지선을 단호하게 그어주세요.'
        }
      ]
    }
  },
  {
    id: 6,
    title: '체육 경기 팀 짤 때 은근한 배제',
    category: '따돌림 예방 & 스포츠맨십',
    location: '체육관 피구 경기 팀 나누기',
    friend: {
      name: '예준',
      avatar: '🧑',
      color: 'bg-teal-100 text-teal-700 border-teal-200',
      role: '피구 팀 주장'
    },
    situation: '자유 체육 시간에 피구 경기를 하려고 주장을 맡은 예준이가 팀원을 뽑고 있어요. 내 차례가 되었는데 예준이가 내 얼굴을 빤히 보더니 "아... 쟤 공 못 잡아서 우리 팀 오면 무조건 지는데. 쟤 빼고 딴 애 데려갈래"라며 대놓고 면박을 줍니다.',
    friendInitialQuote: '“아 솔직히 이겨야 하잖아! 운동 못하는 애 끼면 지는 거 뻔한데 왜?”',
    initialHeart: 50,
    choices: [
      {
        id: '6-a',
        style: 'tiger',
        styleLabel: '공격형 (체육 방해 & 욕설)',
        text: '“너는 얼마나 잘났는데 주둥이만 살아가지고! 오늘 피구 안 해! 공 다 뻥 차버릴 거야!” 피구공을 발로 차버린다.',
        heartChange: -25,
        friendReaction: {
          avatarMood: 'angry',
          dialogue: '“야 공 차면 어떡해? 성격 진짜 파탄 났네. 저러니까 애들이 팀 안 끼워주지!”',
          innerThought: '폭력적으로 공을 차니까 내가 쟤를 뺀 게 정당했다는 생각이 든다.',
          explanation: '분노를 조절하지 못하고 공공 물품을 차거나 소리를 지르면, 오히려 상대에게 배제의 정당한 핑계를 주게 됩니다.'
        }
      },
      {
        id: '6-b',
        style: 'rabbit',
        styleLabel: '소극·순응형 (스스로 포기하기)',
        text: '눈물이 핑 돌며 기가 죽어서 “나 원래 피구 별로 안 좋아해... 그냥 스탠드에 앉아 있을게” 하고 풀 죽어 구석으로 간다.',
        heartChange: -10,
        friendReaction: {
          avatarMood: 'awkward',
          dialogue: '“어 그래? 그럼 관중석에 있어~ 우리끼리 할게!”',
          innerThought: '자기가 안 한다고 하니 오히려 잘됐네.',
          explanation: '스스로 경기를 포기하고 물러나면 소외가 굳어지고 내 자존감도 깊은 상처를 입게 돼요.'
        }
      },
      {
        id: '6-c',
        style: 'hedgehog',
        styleLabel: '수동공격형 (타깃 저격 놀이)',
        text: '상대편 팀에 들어가서 “야, 무조건 예준이 쟤만 노려! 얼굴 맞춰서 피멍 들게 하자”며 이를 갈고 증오를 불태운다.',
        heartChange: -20,
        friendReaction: {
          avatarMood: 'sulking',
          dialogue: '“야 쟤 왜 저렇게 살벌하게 공 던지냐? 살인 피구 하러 왔나...”',
          innerThought: '스포츠인데 개인적 원한으로 복수하려 드니까 무섭고 불쾌하다.',
          explanation: '스포츠를 복수의 수단으로 삼으면 부상 위험이 커지고 감정의 골이 더 깊어집니다.'
        }
      },
      {
        id: '6-d',
        style: 'dolphin',
        styleLabel: '존중·소통형 (스포츠맨십과 존중 호소)',
        text: '“예준아, 이기고 싶은 마음은 알겠지만 모두가 보는 앞에서 실력으로 면박 주면 자존심 상하고 상처받아. 체육 시간은 다 같이 즐겁게 운동하는 시간인 만큼 공평하게 팀을 뽑아줬으면 좋겠어.”',
        heartChange: +35,
        friendReaction: {
          avatarMood: 'touched',
          dialogue: '“아... 이기는 데만 눈이 멀어서 말이 심했어. 미안해. 우리 팀으로 와서 같이 수비 열심히 해보자!”',
          innerThought: '승부욕 때문에 친구 기분을 짓밟았다는 걸 깨달았다. 차분하게 원칙을 말해주니 부끄럽다.',
          explanation: '승부욕을 인정해주면서도 ‘함께 즐기는 수업의 본질’을 상기시키면 편견을 깨고 화합할 수 있어요.'
        }
      }
    ],
    iMessage: {
      idealSentence: '“예준아, 팀을 뽑을 때 친구들 앞에서 내 실력을 깎아내리며 배제하려 했을 때, 자존심도 많이 상하고 위축되어 속상했어. 앞으로는 누구나 차별 없이 참여해서 즐겁게 경기할 수 있도록 배려해 줬으면 좋겠어.”',
      resolutionSummary: '‘이기고 싶은 마음’을 탓하기보다, ‘공개적인 면박으로 인한 내 위축감’을 전하고 공정한 기회를 당당히 요구하세요.',
      steps: [
        {
          stepNumber: 1,
          stepName: '1단계: 사실(상황) 말하기',
          promptPrefix: '“예준아, 팀원을 구성하는 과정에서 ',
          promptSuffix: '”',
          options: [
            { id: '6-1-correct', label: '공개적으로 실력을 언급하며 우리 팀에 오지 말라고 했을 때,', isCorrect: true, hint: '배제당한 구체적 상황을 차분히 묘사해요.' },
            { id: '6-1-wrong1', label: '네가 마치 국가대표라도 된 양 오만방자하게 굴 때,', isCorrect: false, hint: '조롱 섞인 표현은 상대를 자극해요.' },
            { id: '6-1-wrong2', label: '독재자처럼 네 멋대로 애들을 지배하려 들 때,', isCorrect: false, hint: '과격한 비유는 대화를 단절시킵니다.' }
          ],
          pedagogicalTip: '‘실력을 이유로 면박을 주었던 행동’을 객관적으로 짚어주세요.'
        },
        {
          stepNumber: 2,
          stepName: '2단계: 나의 감정/영향 말하기',
          promptPrefix: '“친구들 앞에서 망신을 당한 것 같아 ',
          promptSuffix: '”',
          options: [
            { id: '6-2-correct', label: '자존심도 크게 상하고 많이 위축되어 속상했어.', isCorrect: true, hint: '부끄러움과 소외감을 솔직하게 인정하고 전달해요.' },
            { id: '6-2-wrong1', label: '너 같은 녀석은 피구공에 맞아봐야 정신 차린다고 생각했어.', isCorrect: false, hint: '위협적인 표현은 피해야 합니다.' },
            { id: '6-2-wrong2', label: '솔직히 피구 따위 시시해서 관심도 없었어.', isCorrect: false, hint: '내 진짜 마음을 속이지 마세요.' }
          ],
          pedagogicalTip: '‘자존심 상함과 위축감’을 솔직하게 말하는 것이 용기 있는 태도입니다.'
        },
        {
          stepNumber: 3,
          stepName: '3단계: 구체적인 바람/부탁 말하기',
          promptPrefix: '“체육 시간은 모두의 배움터이니, ',
          promptSuffix: '”',
          options: [
            { id: '6-3-correct', label: '실력과 상관없이 서로 격려하며 공평하게 함께 뛰었으면 좋겠어.', isCorrect: true, hint: '스포츠맨십에 부합하는 건강한 참여를 부탁해요.' },
            { id: '6-3-wrong1', label: '앞으로 모든 경기에서 나를 무조건 1번으로 뽑아줘.', isCorrect: false, hint: '무리한 특혜 요구는 갈등을 일으킵니다.' },
            { id: '6-3-wrong2', label: '너 주장 완장 내려놓고 사퇴해.', isCorrect: false, hint: '감정적인 사퇴 요구는 해결책이 아닙니다.' }
          ],
          pedagogicalTip: '‘모두가 함께 즐기는 수업’의 가치를 제안해 보세요.'
        }
      ]
    }
  },
  {
    id: 7,
    title: '믿고 털어놓은 비밀 폭로',
    category: '신뢰 & 사생활 보호',
    location: '방과 후 복도 창가',
    friend: {
      name: '하은',
      avatar: '👧',
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      role: '가장 친한 단짝'
    },
    situation: '"너한테만 진짜 비밀로 말하는 건데, 나 사실 옆 반 누구를 조금 좋아해"라고 믿고 털어놓았어요. 그런데 하은이가 다음 날 다른 무리 친구들에게 "야 대박 사건 알려줄까?"라며 다 퍼뜨려 온 학년에 소문이 퍼졌어요.',
    friendInitialQuote: '“아니 애들이 하도 캐물어서 나도 모르게 말이 헛나온 거야... 넌 친구 사이에 그것도 이해 못 해?”',
    initialHeart: 50,
    choices: [
      {
        id: '7-a',
        style: 'tiger',
        styleLabel: '공격형 (절교 선언 & 폭언)',
        text: '“너 진짜 입 싸고 가볍다! 배신자야! 너랑 이제 영원히 절교야. 다시는 내 눈앞에 띄지도 마!” 악을 쓴다.',
        heartChange: -30,
        friendReaction: {
          avatarMood: 'angry',
          dialogue: '“말 실수 한번 한 거 가지고 배신자? 그래 나도 너 같은 친구 필요 없거든? 끝내!”',
          innerThought: '미안해서 사과하려 했는데 배신자라고 소리치니 너무 정떨어진다.',
          explanation: '신뢰가 깨져 분노하는 것은 당연하지만, 극단적인 절교와 폭언은 오해를 풀 기회마저 영구히 닫아버립니다.'
        }
      },
      {
        id: '7-b',
        style: 'rabbit',
        styleLabel: '소극·순응형 (등교 거부와 속앓이)',
        text: '너무 부끄럽고 학교 가기가 무서워 방에 틀어박혀 앓으면서도, 하은이에게는 한마디도 따지지 못한다.',
        heartChange: -10,
        friendReaction: {
          avatarMood: 'awkward',
          dialogue: '“하은: 쟤 오늘 왜 결석했지? 감기 걸렸나?”',
          innerThought: '소문난 것 때문에 결석한 줄은 꿈에도 몰랐다.',
          explanation: '상처를 준 친구에게 침묵하면 친구는 자신의 행동이 얼마나 치명적인지 깨닫지 못하고 다른 친구에게도 같은 실수를 반복합니다.'
        }
      },
      {
        id: '7-c',
        style: 'hedgehog',
        styleLabel: '수동공격형 (맞불 비밀 폭로)',
        text: '“너도 한번 당해봐라” 생각하며 하은이가 지난 학기에 시험 실수했던 치명적인 비밀을 다른 반에 다 퍼뜨린다.',
        heartChange: -25,
        friendReaction: {
          avatarMood: 'sulking',
          dialogue: '“너 내 비밀 일부러 퍼뜨렸지? 진짜 치졸하고 무서운 애다.”',
          innerThought: '실수로 말한 나보다 악의를 품고 복수한 쟤가 훨씬 나쁜 애야.',
          explanation: '비밀 폭로에 맞불 폭로로 대응하면 둘 다 치명적인 가해자가 되어 친구 관계가 진흙탕 싸움으로 파탄 납니다.'
        }
      },
      {
        id: '7-d',
        style: 'dolphin',
        styleLabel: '존중·소통형 (신뢰 상실 표현 & 수습 요청)',
        text: '“하은아, 너를 진심으로 믿어서 속마음을 나눈 건데 친구들에게 다 이야기한 걸 알고 너무 충격이고 배신감이 들었어. 지금이라도 소문낸 친구들에게 사실이 아니라고 정정해 주고 내 사생활을 지켜줬으면 좋겠어.”',
        heartChange: +35,
        friendReaction: {
          avatarMood: 'touched',
          dialogue: '“하은: 내가 호기심에 정말 큰 실수를 저질렀어... 네 믿음을 저버려서 너무 미안해. 내가 지금 당장 애들한테 가서 오해라고 정정할게!”',
          innerThought: '나를 믿어준 친구의 마음을 짓밟았다는 생각에 눈물이 난다. 지금이라도 바로잡아야겠다.',
          explanation: '‘너를 믿었던 마음’과 ‘배신감’을 정직하게 마주하게 하고, 소문을 수습할 수 있는 기회를 주는 것이 성숙한 해결책입니다.'
        }
      }
    ],
    iMessage: {
      idealSentence: '“하은아, 너를 믿고 털어놓은 개인적인 비밀을 다른 친구들에게 이야기했을 때, 깊은 배신감과 함께 너무 부끄럽고 마음이 무너져 내렸어. 앞으로는 친구의 비밀을 소중히 지켜주고, 지금이라도 잘못된 소문을 바로잡아 줬으면 좋겠어.”',
      resolutionSummary: '‘너는 입이 싸’라는 비난 대신, ‘너를 믿었기에 느낀 큰 배신감’을 솔직하게 털어놓을 때 친구의 깊은 뉘우침을 이끌어냅니다.',
      steps: [
        {
          stepNumber: 1,
          stepName: '1단계: 사실(상황) 말하기',
          promptPrefix: '“하은아, 너만 알고 있기로 약속하고 나눈 내 비밀을 ',
          promptSuffix: '”',
          options: [
            { id: '7-1-correct', label: '다른 친구들에게 동의 없이 이야기해서 퍼뜨렸을 때,', isCorrect: true, hint: '비밀 누설이라는 명확한 행동 사실을 짚어요.' },
            { id: '7-1-wrong1', label: '스파이처럼 악랄하게 팔아넘겼을 때,', isCorrect: false, hint: '감정적인 비난 단어는 자제하세요.' },
            { id: '7-1-wrong2', label: '생각 없이 입을 털며 날 망신 줄 때,', isCorrect: false, hint: '거친 어휘는 문제 해결을 막습니다.' }
          ],
          pedagogicalTip: '‘동의 없이 비밀을 퍼뜨린 사실’을 차분히 짚어주세요.'
        },
        {
          stepNumber: 2,
          stepName: '2단계: 나의 감정/영향 말하기',
          promptPrefix: '“너를 가장 믿었던 만큼 ',
          promptSuffix: '”',
          options: [
            { id: '7-2-correct', label: '너무나 큰 충격과 배신감이 들고 학교 오기가 두려웠어.', isCorrect: true, hint: '신뢰가 깨졌을 때의 진짜 아픔을 표현해요.' },
            { id: '7-2-wrong1', label: '너 같은 인간이랑 친구 한 내가 한심해 미칠 지경이었어.', isCorrect: false, hint: '자책이나 상대를 저주하는 말은 피해요.' },
            { id: '7-2-wrong2', label: '어차피 너 따위 애초에 믿지도 않았어.', isCorrect: false, hint: '상처를 숨기려 쌀쌀맞게 굴지 마세요.' }
          ],
          pedagogicalTip: '‘배신감과 두려움’이라는 나의 취약한 감정을 솔직히 드러내세요.'
        },
        {
          stepNumber: 3,
          stepName: '3단계: 구체적인 바람/부탁 말하기',
          promptPrefix: '“지금이라도 소문이 난 친구들에게 잘못을 바로잡아 주고, ',
          promptSuffix: '”',
          options: [
            { id: '7-3-correct', label: '앞으로는 친구가 믿고 나눈 사적인 이야기를 꼭 지켜줬으면 좋겠어.', isCorrect: true, hint: '소문 수습과 향후 신뢰 회복의 원칙을 요구해요.' },
            { id: '7-3-wrong1', label: '전교생 앞에서 방송실 마이크 잡고 사과문 낭독해.', isCorrect: false, hint: '과도한 굴욕 요구는 해결을 어렵게 해요.' },
            { id: '7-3-wrong2', label: '그냥 입 꿰매고 조용히 살아.', isCorrect: false, hint: '비이성적인 분노 표출은 삼가세요.' }
          ],
          pedagogicalTip: '친구에게 ‘지금 당장 소문을 수습할 기회’를 열어주세요.'
        }
      ]
    }
  },
  {
    id: 8,
    title: '청소 구역 버리고 먼저 도망가기',
    category: '책임감 & 공정성',
    location: '종례 후 우리 반 교실 뒤편 분리수거함',
    friend: {
      name: '채원',
      avatar: '👧',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      role: '청소 짝꿍'
    },
    situation: '종례가 끝나고 교실 바닥 쓸기와 분리수거를 둘이서 같이 해야 하는 날이에요. 그런데 청소 짝꿍인 채원이가 가방을 메더니 "나 학원 차 지금 타야 돼! 오늘만 네가 다 해줘!" 하고 쓰레받기를 내팽개치고 쏜살같이 교실 문을 뛰쳐나가 버렸어요.',
    friendInitialQuote: '“나 학원 늦으면 원장님한테 혼난단 말이야! 너 착하니까 해줄 수 있지? 땡큐!”',
    initialHeart: 50,
    choices: [
      {
        id: '8-a',
        style: 'tiger',
        styleLabel: '공격형 (전화 폭언 & 협박)',
        text: '도망간 채원이에게 전화를 걸어 “야! 당장 안 튀어와? 내일 학교 오기만 해봐, 가만 안 둘 줄 알아!” 고함을 지른다.',
        heartChange: -25,
        friendReaction: {
          avatarMood: 'angry',
          dialogue: '“학원 늦어서 급했다는데 왜 협박을 해? 무서워서 청소 같이하겠냐?”',
          innerThought: '급한 사정이 있었는데 저렇게 소리 지르고 협박하니까 적반하장으로 화가 난다.',
          explanation: '상대방의 급한 사정을 무시하고 폭언과 협박을 하면 내 정당한 권리가 폭력으로 변질됩니다.'
        }
      },
      {
        id: '8-b',
        style: 'rabbit',
        styleLabel: '소극·순응형 (말없이 땀 흘리기)',
        text: '억울하지만 채원이가 학원에서 혼날까 봐 걱정되어, 혼자 땀 뻘뻘 흘리며 1시간 동안 교실 청소를 다 끝낸다.',
        heartChange: 0,
        friendReaction: {
          avatarMood: 'awkward',
          dialogue: '“와 청소 다 해놨네? 역시 내 청소 짝꿍 최고다ㅎㅎ 앞으로 학원 날마다 부탁할게!”',
          innerThought: '아무 말도 안 하고 다 해주네. 다음에도 바쁜 핑계 대고 도망가야지.',
          explanation: '부당함을 묵인하고 대신 다 해주면 친구의 습관적인 무책임함을 부추기게 됩니다.'
        }
      },
      {
        id: '8-c',
        style: 'hedgehog',
        styleLabel: '수동공격형 (선생님께 비밀 고발)',
        text: '채원이에게는 아무 말도 하지 않고 바로 교무실로 달려가 “선생님, 채원이가 매일 청소 땡땡이쳐요!” 하고 과장해서 고발한다.',
        heartChange: -20,
        friendReaction: {
          avatarMood: 'sulking',
          dialogue: '“오늘 딱 한 번 급해서 그런 건데 매일 도망갔다고 거짓말까지 쳐서 선생님한테 일러바치냐?”',
          innerThought: '나한테 먼저 따지지도 않고 뒤에서 고발하다니 진짜 뒤통수 맞은 기분이다.',
          explanation: '친구와 먼저 대화해보지 않고 거짓을 섞어 고발하면 친구 간의 신뢰가 완전히 깨지게 됩니다.'
        }
      },
      {
        id: '8-d',
        style: 'dolphin',
        styleLabel: '존중·소통형 (사정 공감 & 대체 날짜 약속)',
        text: '문자로 “채원아, 학원 시간이 급했던 건 알겠지만 상의도 없이 혼자 두고 가서 청소하는 내내 힘들고 억울했어. 다음번 내 청소 당번 날에 네가 내 몫까지 대신해 주기로 약속해 줄래?”라고 제안한다.',
        heartChange: +35,
        friendReaction: {
          avatarMood: 'touched',
          dialogue: '“채원: 아... 혼자 다 하느라 진짜 힘들었겠다. 너무 미안해! 다음 주 네 청소 당번 날 내가 혼자 다 도맡아서 할게! 진짜 고마워.”',
          innerThought: '내 급한 사정을 이해해 주면서도 공정하게 대안을 주니까 너무 고맙고 미안하다.',
          explanation: '상대의 불가피한 사정을 이해해주면서도 내 손해를 공정하게 보상받는 대안(청소 맞바꾸기)을 찾으면 서로가 만족합니다.'
        }
      }
    ],
    iMessage: {
      idealSentence: '“채원아, 급한 일이 있더라도 미리 상의 없이 청소를 남겨두고 떠났을 때, 혼자 넓은 교실을 청소하느라 힘들고 억울한 마음이 들었어. 다음번에는 미리 양해를 구하거나, 내 청소 당번 날 네가 대신 맡아주는 공정한 책임을 다해줬으면 좋겠어.”',
      resolutionSummary: '‘너는 무책임해’라고 단정 짓지 않고, ‘혼자 남겨져 겪은 어려움’을 말한 뒤 상호 공정한 대안을 제안하세요.',
      steps: [
        {
          stepNumber: 1,
          stepName: '1단계: 사실(상황) 말하기',
          promptPrefix: '“채원아, 함께 맡은 청소 당번 시간에 ',
          promptSuffix: '”',
          options: [
            { id: '8-1-correct', label: '상의 없이 먼저 가버려서 혼자 청소를 떠맡게 되었을 때,', isCorrect: true, hint: '일어난 상황의 사실만을 객관적으로 짚어요.' },
            { id: '8-1-wrong1', label: '네가 나를 머슴 취급하며 팽개치고 튀었을 때,', isCorrect: false, hint: '격앙된 비유는 상대의 문을 닫게 만듭니다.' },
            { id: '8-1-wrong2', label: '상습적으로 양심 없이 도망갈 때,', isCorrect: false, hint: '‘상습적’이라는 낙인은 오해를 키워요.' }
          ],
          pedagogicalTip: '‘상의 없이 혼자 두고 떠난 행동’을 명확히 짚어주세요.'
        },
        {
          stepNumber: 2,
          stepName: '2단계: 나의 감정/영향 말하기',
          promptPrefix: '“혼자 쓰레기통을 비우고 바닥을 쓸면서 ',
          promptSuffix: '”',
          options: [
            { id: '8-2-correct', label: '체력적으로도 지치고 불공평하다는 생각에 억울하고 속상했어.', isCorrect: true, hint: '혼자 고생하며 느낀 억울함과 피로감을 진솔하게 밝혀요.' },
            { id: '8-2-wrong1', label: '너 같은 이기주의자는 벌을 받아야 마땅하다고 분노했어.', isCorrect: false, hint: '단죄하는 말은 화해를 방해합니다.' },
            { id: '8-2-wrong2', label: '아무 생각 없이 청소하니까 청소 실력이 늘어서 좋았어.', isCorrect: false, hint: '부당함을 긍정으로 왜곡하지 마세요.' }
          ],
          pedagogicalTip: '‘피로감과 억울함’이라는 솔직한 감정을 친구에게 알려주세요.'
        },
        {
          stepNumber: 3,
          stepName: '3단계: 구체적인 바람/부탁 말하기',
          promptPrefix: '“급한 사정이 생기면 미리 양해를 구해주고, ',
          promptSuffix: '”',
          options: [
            { id: '8-3-correct', label: '다음번 내 청소 당번 날에 네가 대신 역할을 맡아 공정하게 해결해 줬으면 좋겠어.', isCorrect: true, hint: '서로가 납득할 수 있는 공정한 교환 대안을 제안해요.' },
            { id: '8-3-wrong1', label: '한 달 치 청소 전부 혼자 다 하고 반성문 써와.', isCorrect: false, hint: '보복성 벌칙은 거부감을 일으켜요.' },
            { id: '8-3-wrong2', label: '내일 학교 오자마자 나한테 90도로 인사해.', isCorrect: false, hint: '굴욕적 요구는 싸움을 만듭니다.' }
          ],
          pedagogicalTip: '‘다음 청소 맞바꾸기’처럼 구체적이고 공정한 해법을 부탁하세요.'
        }
      ]
    }
  }
];

export const STUDENT_AVATARS = [
  { id: 'av-1', emoji: '🧑‍🎓', name: '바른이', desc: '배려심 깊은 친구' },
  { id: 'av-2', emoji: '👧', name: '솔이', desc: '솔직하고 명랑한 친구' },
  { id: 'av-3', emoji: '👦', name: '민재', desc: '의리 있고 활발한 친구' },
  { id: 'av-4', emoji: '🧒', name: '하린', desc: '따뜻하고 신중한 친구' },
  { id: 'av-5', emoji: '🧑‍🦰', name: '우진', desc: '차분하고 정의로운 친구' },
  { id: 'av-6', emoji: '👩', name: '다은', desc: '공감 능력이 뛰어난 친구' }
];
