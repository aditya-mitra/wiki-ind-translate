from typing import List, Optional
from wikipediaapi import Wikipedia
from pysbd import Segmenter

from core.models import Sentence, Project

wiki = Wikipedia("en")
seg = Segmenter(language="en", clean=False)


def getWikiSummary(title: str) -> Optional[str]:
    wiki_page = wiki.page(title)

    if not wiki_page.exists():
        return None

    summary = wiki_page.summary

    # if 'may refer to' in summary or 'may also refer to' in summary:
    #     return None

    return summary


def getSplittedSentences(project) -> List[Sentence]:

    summary = getWikiSummary(project.wiki_title)

    if not summary:
        return []

    return map(
        lambda s: Sentence(project=project, original=s),
        seg.segment(summary),
    )
