import * as React from 'react';
import { shallow } from 'enzyme';
import Config from '../../providers/ConfigProvider/configContext';
import SwitchRouterForm, {
    getListStyle,
    getItemStyle,
    composeExitMap,
    resolveExits,
    SwitchRouterFormProps
} from './SwitchRouter';
import CompMap from '../../services/ComponentMap';
import { getSpecWrapper } from '../../helpers/utils';

const colorsFlow = require('../../../test_flows/a4f64f1b-85bc-477e-b706-de313a022979.json');

const { getTypeConfig, getOperatorConfig } = Config;

describe('SwitchRouter', () => {
    describe('style utils', () => {
        describe('getListStyle', () => {
            it('should return "pointer" cursor style when passed a falsy isDraggingOver arg', () =>
                expect(getListStyle(false)).toEqual({
                    cursor: 'pointer'
                }));

            it('should return "move" cursor style when passed a truthy isDraggingOver arg', () =>
                expect(getListStyle(true)).toEqual({
                    cursor: 'move'
                }));
        });

        describe('getItemStyle', () => {
            const notDraggingStyle = {
                transition: null,
                transform: null,
                pointerEvents: 'auto',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'rgba(0,0,0,0)',
                touchAction: 'manipulation'
            };

            const draggingStyle = {
                position: 'fixed',
                boxSizing: 'border-box',
                pointerEvents: 'none',
                zIndex: 5000,
                width: 595,
                height: 28,
                top: 271.3333435058594,
                left: 318.66668701171875,
                margin: 0,
                transform: 'translate(-2px, 17px)',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'rgba(0,0,0,0)',
                touchAction: 'manipulation'
            };

            it('should return notDragging style when passed a falsy isDragging arg (snapshot)', () =>
                expect(getItemStyle(notDraggingStyle, false)).toMatchSnapshot());

            it('should return dragging style when passed a truthy isDragging arg (snapshot)', () =>
                expect(getItemStyle(draggingStyle, true)).toMatchSnapshot());
        });
    });

    describe('exit utils', () => {
        describe('resolveExits', () =>
            it('should resolve exits', () => {
                const newCases = [
                    {
                        kase: {
                            uuid: '87173eee-5270-4233-aede-ca88e14b672a',
                            type: 'has_any_word',
                            exit_uuid: '7b245d49-e9e3-4387-b4ad-48deb03528cd',
                            arguments: ['red, r']
                        },
                        exitName: 'Red'
                    }
                ];

                const node = {
                    uuid: 'bc978e00-2f3d-41f2-87c1-26b3f14e5925',
                    router: {
                        type: 'switch',
                        default_exit_uuid: 'a8bdc1c5-0283-4656-b932-4f4094f4cc7e',
                        cases: [
                            {
                                uuid: '87173eee-5270-4233-aede-ca88e14b672a',
                                type: 'has_any_word',
                                exit_uuid: '7b245d49-e9e3-4387-b4ad-48deb03528cd',
                                arguments: ['red, r']
                            }
                        ],
                        operand: '@run.results.color '
                    },
                    exits: [
                        {
                            name: 'Red',
                            uuid: '7b245d49-e9e3-4387-b4ad-48deb03528cd',
                            destination_node_uuid: 'e2ecc8de-9774-4b74-a0dc-ca8aea123227'
                        },
                        {
                            uuid: 'a8bdc1c5-0283-4656-b932-4f4094f4cc7e',
                            name: 'Other',
                            destination_node_uuid: '533b64e2-5906-4d33-a8e9-64f1cb6c20dd'
                        }
                    ],
                    wait: {
                        type: 'exp'
                    }
                };

                expect(resolveExits(newCases, node)).toMatchSnapshot();
            }));

        describe('composeExits', () => {
            it('should compose a map of exits', () =>
                expect(
                    composeExitMap([
                        {
                            uuid: '63e20770-64c1-4bad-bd73-a34cf6d46866',
                            name: 'All Responses',
                            destination_node_uuid: null
                        }
                    ])
                ).toMatchSnapshot());
        });
    });

    describe('Component: SwitchRouterForm', () => {
        const { definition } = colorsFlow;
        const { nodes: [, node] } = definition;
        const config = getTypeConfig('wait_for_response');
        const ComponentMap = new CompMap(definition);

        const localizations = [
            {
                localizedKeys: {},
                localizedObject: {
                    uuid: 'fa0a9b24-5f19-4b8e-b287-27af5811de1d',
                    type: 'has_any_word',
                    exit_uuid: '55855afc-f612-4ef9-9288-dcb1dd136052',
                    arguments: ['red, r']
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                },
                language: {
                    iso: 'spa',
                    name: 'Spanish'
                }
            },
            {
                localizedKeys: {},
                localizedObject: {
                    uuid: 'b5f900b9-ad13-479a-8ad3-1f1ad5ac88f2',
                    type: 'has_any_word',
                    exit_uuid: '668ca2ab-8d49-47f5-82a1-e3a82a58e5fb',
                    arguments: ['orange, o']
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {},
                localizedObject: {
                    uuid: 'e9c842e8-f1c5-4f07-97e7-50a4f93b22e5',
                    type: 'has_any_word',
                    exit_uuid: '14806949-d583-49e2-aa55-03aa16ee5a3a',
                    arguments: ['yellow, y']
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {},
                localizedObject: {
                    uuid: 'cc5894af-5dce-454e-a525-3d7c5c41d21d',
                    type: 'has_any_word',
                    exit_uuid: '77394377-f6b8-4366-9bef-d468621258ef',
                    arguments: ['green, g']
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {},
                localizedObject: {
                    uuid: '590d13e3-7b47-44e3-b8a0-ba9bd41d75d2',
                    type: 'has_any_word',
                    exit_uuid: '92d429d8-c275-4306-9360-93f4b9c7acb1',
                    arguments: ['blue, b']
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {},
                localizedObject: {
                    uuid: '2a7cbed1-6597-4545-b145-14a2e9282e6c',
                    type: 'has_any_word',
                    exit_uuid: '2de9af80-1bd9-4f37-839f-073edbd14369',
                    arguments: ['indigo, i']
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {},
                localizedObject: {
                    uuid: 'ab99e18c-433f-436e-9278-08bcf506f433',
                    type: 'has_any_word',
                    exit_uuid: '5760ec2f-04d4-492b-817b-9f395633ec79',
                    arguments: ['violet, v']
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {
                    name: true
                },
                localizedObject: {
                    name: ['Rojo'],
                    uuid: '55855afc-f612-4ef9-9288-dcb1dd136052',
                    destination_node_uuid: 'bc978e00-2f3d-41f2-87c1-26b3f14e5925'
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                },
                localized: true
            },
            {
                localizedKeys: {},
                localizedObject: {
                    name: 'Orange',
                    uuid: '668ca2ab-8d49-47f5-82a1-e3a82a58e5fb',
                    destination_node_uuid: 'bc978e00-2f3d-41f2-87c1-26b3f14e5925'
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {
                    name: true
                },
                localizedObject: {
                    name: ['Amarillo'],
                    uuid: '14806949-d583-49e2-aa55-03aa16ee5a3a',
                    destination_node_uuid: 'bc978e00-2f3d-41f2-87c1-26b3f14e5925'
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                },
                localized: true
            },
            {
                localizedKeys: {
                    name: true
                },
                localizedObject: {
                    name: ['Verde'],
                    uuid: '77394377-f6b8-4366-9bef-d468621258ef',
                    destination_node_uuid: 'bc978e00-2f3d-41f2-87c1-26b3f14e5925'
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                },
                localized: true
            },
            {
                localizedKeys: {},
                localizedObject: {
                    name: 'Blue',
                    uuid: '92d429d8-c275-4306-9360-93f4b9c7acb1',
                    destination_node_uuid: 'bc978e00-2f3d-41f2-87c1-26b3f14e5925'
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {},
                localizedObject: {
                    name: 'Indigo',
                    uuid: '2de9af80-1bd9-4f37-839f-073edbd14369',
                    destination_node_uuid: 'bc978e00-2f3d-41f2-87c1-26b3f14e5925'
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {},
                localizedObject: {
                    name: 'Violet',
                    uuid: '5760ec2f-04d4-492b-817b-9f395633ec79',
                    destination_node_uuid: 'bc978e00-2f3d-41f2-87c1-26b3f14e5925'
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            },
            {
                localizedKeys: {},
                localizedObject: {
                    uuid: '326a41b7-9bce-453b-8783-1113f649663c',
                    name: 'Other',
                    destination_node_uuid: '4fac7935-d13b-4b36-bf15-98075dca822a'
                },
                iso: 'spa',
                languages: {
                    eng: 'English',
                    spa: 'Spanish'
                }
            }
        ];

        /** Add dynamically: showAdvanced, translating, iso, localizations, getLocalizedExits */
        const props = {
            node,
            config,
            definition,
            ComponentMap,
            updateRouter: jest.fn(),
            onBindWidget: jest.fn(),
            onBindAdvancedWidget: jest.fn(),
            removeWidget: jest.fn(),
            updateLocalizations: jest.fn(),
            renderExitTranslations: jest.fn(),
            getLocalizedExits: jest.fn()
        };

        const context = {
            getOperatorConfig
        };

        const SwitchFormWaitBasic = shallow(
            <SwitchRouterForm
                {...{
                    ...props,
                    showAdvanced: false,
                    translating: false,
                    iso: 'eng'
                }}
            />,
            { context }
        );

        const SwitchFormWaitTranslating = shallow(
            <SwitchRouterForm
                {...{
                    ...props,
                    showAdvanced: false,
                    translating: false,
                    iso: 'spa',
                    localizations,
                    renderExitTranslations: jest.fn(),
                    getLocalizedExits: jest.fn()
                }}
            />,
            { context }
        );

        // const SwitchFormWaitAdvanced = shallow();

        describe('render', () => {
            it('should render basic form', () => {});

            it('should render advanced form', () => {});
        });
    });
});
