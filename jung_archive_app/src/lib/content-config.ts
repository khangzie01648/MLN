import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PILLAR_META, PillarConfig } from './pillar-constants';
import { ArticleConfig } from './types';

// Define the content directories
const contentDirectory = path.join(process.cwd(), 'content');
// Assuming JUNG_ARCHIVE_FINAL is a sibling of jung_archive_app
const archivesDirectory = path.resolve(process.cwd(), '../JUNG_ARCHIVE_FINAL');

// Helper to map filename to Pillar ID
function classifyPillar(filename: string, sourceDir: string): string {
    // If it's from the main content directory, use existing prefix logic
    if (sourceDir === contentDirectory) {
        if (filename.startsWith('biography_')) return 'tieu-su';
        if (filename.startsWith('concepts_')) return 'khai-niem';
        if (filename.startsWith('red_book_')) return 'sach-do';
        if (filename.startsWith('alchemy_')) return 'gia-kim';
        if (filename.startsWith('practice_')) return 'thuc-hanh';
        if (filename.startsWith('symbols_')) return 'bieu-tuong';
        if (filename.startsWith('spirit_')) return 'tam-linh';
        if (filename.startsWith('legacy_')) return 'di-san';
        if (filename.startsWith('cosmos_')) return 'vu-tru';
        if (filename.startsWith('encounters_')) return 'gap-go';
        return 'khai-niem'; // Default
    }

    // If it's from the archives directory
    if (sourceDir === archivesDirectory || sourceDir.includes('JUNG_ARCHIVE_FINAL')) {
        // Vietnamese Core Series
        if (filename.startsWith('vn_')) return 'vietnamese_core';

        // The Compendiums (Large Archives)
        if (filename.startsWith('archive_')) return 'compendium';

        // Essays & Deep Dives
        if (filename.startsWith('essay_')) return 'essays';

        // Specific Topics
        if (filename.startsWith('topic_')) return 'topics';

        // Biography
        if (filename.startsWith('biography_')) return 'biography_full';

        // Default fallback
        return 'library';
    }

    return 'library';
}

function getArticlesFromDir(dirPath: string): { pillarId: string; article: ArticleConfig }[] {
    if (!fs.existsSync(dirPath)) return [];

    // Check if it's a directory or symlink
    try {
        const stats = fs.statSync(dirPath);
        if (!stats.isDirectory()) return [];
    } catch (e) {
        return [];
    }

    const fileNames = fs.readdirSync(dirPath);
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const fullPath = path.join(dirPath, fileName);
            let fileContents = '';
            try {
                fileContents = fs.readFileSync(fullPath, 'utf8');
            } catch (e) {
                console.error(`Error reading file ${fullPath}`, e);
                return null;
            }

            if (!fileContents) return null;

            const { data } = matter(fileContents);
            const pillarId = classifyPillar(fileName, dirPath);
            const slug = fileName.replace(/\.md$/, '');

            const result: { pillarId: string; article: ArticleConfig } = {
                pillarId,
                article: {
                    slug: slug,
                    sourceFile: fileName,
                    fullPath: fullPath,
                    title: data.title || slug.replace(/_/g, ' '),
                    description: data.description || "Tài liệu lưu trữ"
                }
            };
            return result;
        })
        .filter((item): item is { pillarId: string; article: ArticleConfig } => item !== null);
}

export function getPillars(): PillarConfig[] {
    // 1. Read files from BOTH directories
    const contentArticles = getArticlesFromDir(contentDirectory);
    const archiveArticles = getArticlesFromDir(archivesDirectory);

    const allArticles = [...contentArticles, ...archiveArticles];

    // 2. Group by Pillar
    const pillars: Record<string, PillarConfig> = {};

    // Initialize pillars structure based on META
    Object.keys(PILLAR_META).forEach(id => {
        const meta = PILLAR_META[id];
        if (meta) {
            pillars[id] = {
                ...meta,
                articles: []
            };
        }
    });

    // Ensure library and archives pillars exist if not in META
    if (!pillars['library']) {
        pillars['library'] = {
            id: 'library',
            name: 'Thư Viện Số',
            nameVi: 'Thư Viện',
            description: 'Nghiên cứu & Chuyên khảo',
            icon: 'book',
            color: '#d4af37',
            articles: []
        };
    }
    if (!pillars['archives']) {
        pillars['archives'] = {
            id: 'archives',
            name: 'Lưu Trữ Khổng Lồ',
            nameVi: 'Kho Lưu Trữ',
            description: 'Sách gốc & Tài liệu nguồn',
            icon: 'archive',
            color: '#8b0000',
            articles: []
        };
    }

    // Distribute articles
    allArticles.forEach(({ pillarId, article }) => {
        if (pillars[pillarId]) {
            if (!pillars[pillarId].articles) pillars[pillarId].articles = [];
            pillars[pillarId].articles!.push(article);
        } else {
            // Fallback for unknown pillars? Put in library
            if (!pillars['library']) {
                pillars['library'] = {
                    id: 'library',
                    name: 'Thư Viện Khác',
                    nameVi: 'Thư Viện',
                    description: 'Tài liệu bổ sung',
                    icon: 'folder',
                    color: '#bdc3c7', // Grey
                    articles: []
                };
            }
            if (!pillars['library'].articles) pillars['library'].articles = [];
            pillars['library'].articles!.push(article);
        }
    });

    // Ensure pillars for new archive types exist
    if (!pillars['compendium']) {
        pillars['compendium'] = {
            id: 'compendium',
            name: 'Hồ Sơ Toàn Thư',
            nameVi: 'Toàn Thư',
            description: 'Các bộ sưu tập khổng lồ về Jung.',
            icon: 'archive',
            color: '#d4af37', // Gold
            articles: []
        };
    }
    if (!pillars['vietnamese_core']) {
        pillars['vietnamese_core'] = {
            id: 'vietnamese_core',
            name: 'Cốt Lõi Việt Ngữ',
            nameVi: 'Sách Cốt Lõi',
            description: '10 chủ đề nền tảng đã được 10x nội dung.',
            icon: 'book-open',
            color: '#e74c3c', // Red
            articles: []
        };
    }
    if (!pillars['essays']) {
        pillars['essays'] = {
            id: 'essays',
            name: 'Tiểu Luận',
            nameVi: 'Tiểu Luận',
            description: 'Các bài phân tích chuyên sâu ngắn.',
            icon: 'file-text',
            color: '#3498db', // Blue
            articles: []
        };
    }
    if (!pillars['topics']) {
        pillars['topics'] = {
            id: 'topics',
            name: 'Chuyên Đề',
            nameVi: 'Chuyên Đề',
            description: 'Các chủ đề cụ thể và chi tiết.',
            icon: 'list',
            color: '#9b59b6', // Purple
            articles: []
        };
    }
    if (!pillars['biography_full']) {
        pillars['biography_full'] = {
            id: 'biography_full',
            name: 'Tiểu Sử Chi Tiết',
            nameVi: 'Tiểu Sử',
            description: 'Cuộc đời và di sản.',
            icon: 'user',
            color: '#2ecc71', // Green
            articles: []
        };
    }
    if (!pillars['library']) {
        pillars['library'] = {
            id: 'library',
            name: 'Thư Viện Khác',
            nameVi: 'Thư Viện',
            description: 'Tài liệu bổ sung',
            icon: 'folder',
            color: '#bdc3c7', // Grey
            articles: []
        };
    }

    return Object.values(pillars);
}


export function getPillarById(id: string) {
    const pillars = getPillars();
    return pillars.find(p => p.id === id);
}

export function getArticle(pillarId: string, slug: string) {
    const pillar = getPillarById(pillarId);
    if (!pillar) return undefined;

    // We need to know WHERE the file is to read its content in full later, 
    // but ArticleConfig only stores sourceFile name. 
    // Ideally update ArticleConfig to store fullPath, but that might break frontend serialization.
    // For now, checks are done by slug matching.
    return pillar.articles?.find(a => a.slug === slug);
}

export function getAllArticleSlugs() {
    const pillars = getPillars();
    let slugs: { pillar: string; slug: string }[] = [];
    pillars.forEach(p => {
        p.articles?.forEach(a => {
            slugs.push({ pillar: p.id, slug: a.slug });
        });
    });
    return slugs;
}

export function getAllArticlesFlat() {
    const pillars = getPillars();
    let articles: any[] = [];
    pillars.forEach(p => {
        p.articles?.forEach(a => {
            articles.push({
                ...a,
                pillarId: p.id,
                pillarName: p.nameVi || p.name,
                pillarColor: p.color
            });
        });
    });
    return articles;
}

