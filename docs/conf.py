# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import os
import sys
from datetime import datetime
sys.path.insert(0, os.path.abspath('.'))

# At top on conf.py (with other import statements)
import recommonmark
from recommonmark.transform import AutoStructify

# -- Project information -----------------------------------------------------

project = 'Nextclade'
copyright = f'2020-{datetime.now().year}, Trevor Bedford and Richard Neher'
author = 'The Nextstrain Team'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'recommonmark',
    'sphinx.ext.intersphinx',
    'sphinx.ext.mathjax',
    'sphinx_markdown_tables',
    'sphinxarg.ext',
    'sphinx.ext.autodoc',
    'sphinx_tabs.tabs'
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = [
    "README.md"
    "dev/**/*"
]


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'nextstrain-sphinx-theme'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

html_css_files = [
    'css/custom.css',
]

html_favicon = '_static/favicon.ico'

html_theme_options = {
    'logo_only': False,
    'collapse_navigation': False,
    'titles_only': True,
}


# -- Cross-project references ------------------------------------------------

intersphinx_mapping = {
}


# At the bottom of conf.py
def setup(app):
    app.add_config_value('recommonmark_config', {
        'url_resolver': lambda url: github_doc_root + url,
        'auto_toc_tree_section': 'Contents',
        'enable_math': True,
        'enable_inline_math': True,
    }, True)
    app.add_transform(AutoStructify)
