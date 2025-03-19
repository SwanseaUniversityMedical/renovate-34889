# 34889

Reproduction for Renovate [discussion 34889](https://github.com/renovatebot/renovate/discussions/34889).

## Current behavior

With `helpers:pinGitHubActionDigests` enabled in the config I receive errors when renovate tries to pin suffixed dependencies.

We manage a monorepo of independently versioned github actions and reusable workflows. They are git-tagged with SemVer compliant suffixes such as `v1.0.8-foobar-action` and `v3.0.0-bizzbuzz-action`. 

Renovate does a good job of updating these tags in most cases, but is failing when `pinDigests` is true. 

This reproduction repo focuses around a github workflow that needs it's github actions to be bumped and also digest pinned. Namely https://github.com/SwanseaUniversityMedical/renovate-34889/blob/3338b4434f6b0d2d877d6f05b6014bbb2a14259e/.github/workflows/workflows-run-actions.yaml#L14-L28

A workflows containing the following use of our action which needs to be pinned:
```
steps:
  - uses: my-org/workflows/.github/actions/foobar@v1.0.8-foobar-action
```

Yields the following renovates error logs:
```
DEBUG: Value is not updated (repository=my-org/workflows, packageFile=.github/workflows/workflows-foobar.yaml, branch=renovate/pin-dependencies)
       "depName": "my-org/workflows",
       "manager": "github-actions",
       "expectedValue": "v1.0.8-foobar-action",
       "foundValue": "v1.0.8"
 WARN: Error updating branch: update failure (repository=my-org/workflows, branch=renovate/pin-dependencies)
```

I can't see what renovate is doing to the file internally when this error is thrown, but it looks like it is probably outputting:

```
  - uses: my-org/workflows/.github/actions/foobar@abcdefgabcdefg # v1.0.8
```

## Expected behavior

The expected output should faithfully preserve the git-tag suffix:
```
  - uses: my-org/workflows/.github/actions/foobar@abcdefgabcdefg # v1.0.8-foobar-action
```

## Additional strange behaviour

I've seen the documentation here https://docs.renovatebot.com/modules/manager/github-actions/#digest-pinning-and-updating

> The GitHub tag is in the format of (prefix-)(v)1.0.0, where prefix and v are optional and 1.0.0 is the version number. Here are the examples of valid GitHub tags: 1.0.1, 1.0, 1, v1.0.1, v1.0, v1, prefix-1.0.1, prefix-1.0, prefix-1, prefix-v1.0.1, prefix-v1.0, prefix-v1.

This implies it would work with a prefixed tag not a suffixed one. However, prefixed tags are not detected at all in the dependency dashboard. As can be seen below `v1.0.0-foobar-action` and `v1.0.0-bizzbuzz-action` are detected but the prefixed tags `foobar-action-v1.0.0` and `bizzbuzz-action-v1.0.0` are not detected.

Since suffixes are valid SemVer and prefixes aren't I feel at the very least suffixes should be supported.

### Detected dependencies

<details><summary>github-actions</summary>
<blockquote>

<details><summary>.github/workflows/workflows-run-actions.yaml</summary>

 - `SwanseaUniversityMedical/renovate-34889 v1.0.0-foobar-action`
 - `SwanseaUniversityMedical/renovate-34889 v1.0.0-bizzbuzz-action`

</details>

</blockquote>
</details>



## Link to the Renovate issue or Discussion

https://github.com/renovatebot/renovate/discussions/34889
