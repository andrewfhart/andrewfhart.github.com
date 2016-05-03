---
layout: page
title: Publications
permalink: /publications/
---
<div class="panel">
<div class="row publications">
    <section>
        <blockquote class="panel">
            <p class="fsource">&quot;The single biggest problem in communication is the illusion that it has taken place.&quot;</p>
            <footer>
                <cite> George Bernard Shaw</cite>
            </footer>
        </blockquote>
        <p>Writing helps me to organize my thoughts, clarify my motivations, and pushes me become a better communicator. This page contains a complete list of the publications that I have either led or participated in.</p>

        <p>The following "tag cloud" image was generated using the words in the titles of all of the publications listed below.</p>
    </section>
    <div id="tagcloud"></div>
</div>

<h4>Peer-reviewed Journal Publications</h4>

  <ul class="mdl-list menu-item publication-list">
    {% for pub in site.data.pubs_journals %}<li>
        <div class="publication">
            {% if pub.image %}<img src="/images/publications/covers/{{ pub.image }}" alt="cover" class="pub-teaser">{% endif %}
            <div class="title pub-title">{% if pub.url %}<a href="{{ pub.url }}" target="_new">{% endif %}{{ pub.title }}{% if pub.url %}</a>{% endif %}</div>
            <div class="title pub-venue">{{ pub.venue }}</div>
            <div class="excerpt pub-authors">Authors: {{ pub.attrib }}</div>
            <div class="excerpt pub-extra">{{ pub.extra }}</div>
        </div>
    </li>{% endfor %}
  </ul>

<h4>Book Chapters</h4>

  <ul class="mdl-list menu-item publication-list">
    {% for pub in site.data.pubs_chapters %}<li>
        <div class="publication">
            {% if pub.image %}<img src="/images/publications/covers/{{ pub.image }}" alt="cover" class="pub-teaser">{% endif %}
            <div class="title pub-title">{% if pub.url %}<a href="{{ pub.url }}" target="_new">{% endif %}{{ pub.title }}{% if pub.url %}</a>{% endif %}</div>
            <div class="title pub-venue">{{ pub.venue }}</div>
            <div class="excerpt pub-authors">Authors: {{ pub.attrib }}</div>
            <div class="excerpt pub-extra">{{ pub.extra }}</div>
        </div>
    </li>{% endfor %}
  </ul>

<h4>Technology Reports</h4>

  <ul class="mdl-list menu-item publication-list">
    {% for pub in site.data.pubs_technicalreports %}<li>
        <div class="publication no-image">
            {% if pub.image %}<img src="/images/publications/covers/{{ pub.image }}" alt="cover" class="pub-teaser">{% endif %}
            <div class="title pub-title">{% if pub.url %}<a href="{{ pub.url }}" target="_new">{% endif %}{{ pub.title }}{% if pub.url %}</a>{% endif %}</div>
            <div class="title pub-venue">{{ pub.venue }}</div>
            <div class="excerpt pub-authors">Authors: {{ pub.attrib }}</div>
            <div class="excerpt pub-extra">{{ pub.extra }}</div>
        </div>
    </li>{% endfor %}
  </ul>

<h4>Technical Articles</h4>

  <ul class="mdl-list menu-item publication-list">
    {% for pub in site.data.pubs_technicalarticles %}<li>
        <div class="publication no-image">
            {% if pub.image %}<img src="/images/publications/covers/{{ pub.image }}" alt="cover" class="pub-teaser">{% endif %}
            <div class="title pub-title">{% if pub.url %}<a href="{{ pub.url }}" target="_new">{% endif %}{{ pub.title }}{% if pub.url %}</a>{% endif %}</div>
            <div class="title pub-venue">{{ pub.venue }}</div>
            <div class="excerpt pub-authors">Authors: {{ pub.attrib }}</div>
            <div class="excerpt pub-extra">{{ pub.extra }}</div>
        </div>
    </li>{% endfor %}
  </ul>

<h4>Research Grants</h4>

  <ul class="mdl-list menu-item publication-list">
    {% for pub in site.data.pubs_researchgrants %}<li>
        <div class="publication no-image">
            {% if pub.image %}<img src="/images/publications/covers/{{ pub.image }}" alt="cover" class="pub-teaser">{% endif %}
            <div class="title pub-title">{% if pub.url %}<a href="{{ pub.url }}" target="_new">{% endif %}{{ pub.title }}{% if pub.url %}</a>{% endif %}</div>
            <div class="title pub-venue">{{ pub.venue }}</div>
            <div class="excerpt pub-authors">{{ pub.attrib }}</div>
            <div class="excerpt pub-extra">{{ pub.extra }}</div>
        </div>
    </li>{% endfor %}
  </ul>


<h4>Refereed Conferences and Workshops</h4>

  <ul class="mdl-list menu-item publication-list">
    {% for pub in site.data.pubs_conferences %}<li>
        <div class="publication no-image">
            {% if pub.image %}<img src="/images/publications/covers/{{ pub.image }}" alt="cover" class="pub-teaser">{% endif %}
            <div class="title pub-title">{% if pub.url %}<a href="{{ pub.url }}" target="_new">{% endif %}{{ pub.title }}{% if pub.url %}</a>{% endif %}</div>
            <div class="title pub-venue">{{ pub.venue }}</div>
            <div class="excerpt pub-authors">Authors: {{ pub.attrib }}</div>
            <div class="excerpt pub-extra">{{ pub.extra }}</div>
        </div>
    </li>{% endfor %}
  </ul>

</div>
