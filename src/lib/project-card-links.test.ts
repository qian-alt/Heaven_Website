import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { projects } from '../data/projects';

const component = readFileSync(new URL('../components/ProjectCard.astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('project card external actions', () => {
  it('gives the personal blog both live site and GitHub destinations', () => {
    const personalBlog = projects.find((project) => project.title === '个人博客网站');

    expect(personalBlog).toMatchObject({
      demo: 'https://www.dearheaven.cn/',
      repository: 'https://github.com/qian-alt/Heaven_Website',
    });
  });

  it('renders optional Site then GitHub buttons from existing fields', () => {
    expect(component).toContain('project.demo &&');
    expect(component).toContain('project.repository &&');
    expect(component.indexOf('project.demo &&')).toBeLessThan(component.indexOf('project.repository &&'));
    expect(component).toContain('>Site</span>');
    expect(component).toContain('>GitHub</span>');
    expect(component).toContain('aria-hidden="true"');
  });

  it('styles project actions as lightweight pill links', () => {
    expect(component).toContain('project-action');
    expect(styles).toContain('.project-action');
    expect(styles).toContain('border-radius: 999px;');
  });
});
