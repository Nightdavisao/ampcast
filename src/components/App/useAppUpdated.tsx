import React, {useEffect, useMemo} from 'react';
import {downloadUrl, forkRepoUrl} from 'services/constants';
import {alert} from 'components/Dialog';
import ExternalLink from 'components/ExternalLink';

const versionKey = 'ampcast/installed-version';

export default function useAppUpdated(): void {
    const currentVersion = useMemo(() => localStorage.getItem(versionKey), []);

    useEffect(() => {
        localStorage.setItem(versionKey, __app_version__);
        if (currentVersion && currentVersion !== __app_version__) {
            const timerId = setTimeout(() => {
                alert({
                    icon: 'ampcast',
                    title: 'App updated',
                    message: (
                        <>
                            <p>futacast (fork of ampcast) has been updated to commit {__app_commit_hash__}.</p>
                            <p>
                                <ExternalLink
                                    style={{textDecoration: 'underline'}}
                                    href={`${forkRepoUrl}/commit/${__app_commit_hash__}`}
                                >
                                    View commit
                                </ExternalLink>
                                {' · '}
                                {currentVersion && (
                                    <ExternalLink
                                        style={{textDecoration: 'underline'}}
                                        href={`${forkRepoUrl}/compare/${currentVersion}...${__app_commit_hash__}`}
                                    >
                                        Changes since {currentVersion}
                                    </ExternalLink>
                                )}
                            </p>
                        </>
                    ),
                    system: true,
                });
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [currentVersion]);
}
