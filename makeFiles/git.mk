.PHONY: startFeature finishFeature

PROJECT_GIT_BRANCH := $(shell git branch --show-current)
ISSUE_BRANCH := ${subst feature/, , ${PROJECT_GIT_BRANCH}}
RELEASE_BRANCH := ${subst release/, , ${PROJECT_GIT_BRANCH}}

f = f
r = r

help-body::
	@$(call HELP_HEADING,-,Git targets)
	@$(HELP) "* startFeature" "startFeature will start feature"
	@$(HELP) "* finishFeature" "finishFeature will finish feature"
	@echo

startFeature:
	git pull --rebase origin develop
	git flow feature start ${f}

finishFeature:
	git flow feature finish --no-ff ${ISSUE_BRANCH}
	git pull --rebase origin develop
	git push origin develop

push:
	git push origin ${PROJECT_GIT_BRANCH}
