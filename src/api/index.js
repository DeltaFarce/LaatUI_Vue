import request from '../utils/request';
let host = 'http://101.37.30.155'
// let host = 'http://0.0.0.0'
// let host = 'http://127.0.0.1:8000'

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

// 项目
export const getProject = () => {
    return request({
        url: host+'/projects/',
        method: 'get',
    })
}

export const createProject = (data) => {
    return request({
        url: host+`/projects/`,
        method: 'post',
        data: data
    });
}

export const deleteProject = (params) => {
    return request({
        url: host+"/projects/"+params+"/",
        method: 'delete'
    });
}

export const editProject = (params, data) => {
    return request({
        url: host+`/projects/`+params+"/",
        method: 'put',
        data: data
    });
}

export const searchProjects = (searchProject) => {
    return request({
        url: host+'/projects/?search='+ searchProject,
        method: 'get',
    });
}

// 测试用例
export const getTestcase = () => {
    return request({
        url: host+`/cases/`,
        method: 'get',
    });
}

export const getProjectToTestcase = (page,page_size,orderkey,project) => {
    return request({
        url: host+`/cases/?page=`+page+'&page_size='+page_size+'&ordering='+orderkey+'&project='+project,
        method: 'get',
    });
}


export const createTestCase = (data) => {
    return request({
        url: host+`/cases/`,
        method: 'post',
        data: data
    });
}

export const deleteTestCase = (params) => {
    return request({
        url: host+"/cases/"+params+"/",
        method: 'delete'
    });
}

export const editTestCase = (params, data) => {
    return request({
        url: host+`/cases/`+params+"/",
        method: 'put',
        data: data
    });
}

export const runCase = (params, data) => {
    return request({
        url: host+`/cases/`+params+"/run/",
        method: 'post',
        data: data
    });
}

export const searchTestcase = (searchCases) => {
    return request({
        url: host+'/cases/?search='+ searchCases,
        method: 'get',
    });
}

export const allDelTestcase = (delCases) => {
    return request({
        url: host+'/cases/allDel/?deleteid='+ delCases,
        method: 'get',
    });
}


// 测试报告
export const getReports = (page,page_size,orderkey,project) => {
    return request({
        url: host+`/reports/?page=`+page+'&page_size='+page_size+'&ordering='+orderkey+'&project='+project,
        method: 'get',
    });
}

export const searchReports = (searchReport) => {
    return request({
        url: host+'/reports/?search='+ searchReport,
        method: 'get',
    });
}

// 大盘数据
export const cpu = () => {
    return request({
        url: host + '/cpu',
        method: 'get',
    });
}

export const mem = () => {
    return request({
        url: host + '/mem',
        method: 'get',
    });
}

export const net = () => {
    return request({
        url: host + '/net',
        method: 'get',
    });
}

export const df = () => {
    return request({
        url: host + '/df',
        method: 'get',
    });
}

export const load = () => {
    return request({
        url: host + '/load',
        method: 'get',
    });
}

export const top = () => {
    return request({
        url: host + '/top',
        method: 'get',
    });
}

export const countTestCases = () => {
    return request({
        url: host + '/cases/countTestCases/',
        method: 'get',
    });
}

export const countReports = () => {
    return request({
        url: host + '/reports/countResport/',
        method: 'get',
    });
}