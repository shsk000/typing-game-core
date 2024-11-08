import { Other } from "../other";
import { Sokuon } from "../sokuon";
import { Youon } from "../youon";

export const japaneseSoundsParser = (hiraganaSentence: string) => {
  const result: (Other | Sokuon | Youon)[] = [];

  for (let i = 0; i < hiraganaSentence.length; i++) {
    const targetHiragana = hiraganaSentence[i];
    const nextTargetHiragana: string | undefined = hiraganaSentence[i + 1] as
      | string
      | undefined;

    const sokuon = Sokuon.fromHiragana(targetHiragana);
    if (sokuon) {
      result.push(sokuon);
      continue;
    }

    if (Youon.isSutegana(nextTargetHiragana)) {
      const youon = Youon.fromHiragana(targetHiragana + nextTargetHiragana);
      if (youon) {
        result.push(youon);
        // 二文字使って拗音クラスを作成しているため、ループ回数を手動で回す
        i++;
        continue;
      }
      // 「あぁ」など拗音タイピングのフォーマットとしてはないが、日本語として存在するパターンがある
      // その場合１文字ずつOtherクラスを作成する
    }

    const other = Other.fromHiragana(targetHiragana);
    if (other) {
      result.push(other);
      continue;
    }
    console.error(
      `japaneseSoundsParser: Could not parsed. hiragna: ${targetHiragana}`
    );
  }

  return result;
};
