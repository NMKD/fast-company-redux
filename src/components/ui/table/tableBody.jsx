import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ users, columns }) => {
    const renderContent = (item, col) => {
        const component = columns[col].component;
        if (component && typeof component === "function") {
            return component(item);
        }
        return _.get(item, columns[col].path);
    };
    return (
        <>
            <tbody>
                {users.map((item) => (
                    <tr key={item._id}>
                        {Object.keys(columns).map((col) => (
                            <td key={col}>{renderContent(item, col)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </>
    );
};

TableBody.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
